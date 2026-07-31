package com.netec.exams.notification.application;

import com.netec.exams.examrequest.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class ApprovalEmailModelFactory {
  private final ExamRequestParticipantRepository participants;
  private final ParticipantExamAssignmentRepository assignments;
  public ApprovalEmailModelFactory(ExamRequestParticipantRepository participants, ParticipantExamAssignmentRepository assignments){this.participants=participants;this.assignments=assignments;}
  public ApprovalEmailModel create(ExamRequest request, String approverName, Instant submittedAt){
    var people=participants.findByExamRequestId(request.id());
    var links=assignments.findByExamRequestId(request.id());
    if(people.isEmpty()||links.isEmpty()) throw new IllegalStateException("EMAIL_MODEL_INCOMPLETE");
    var byId=people.stream().collect(Collectors.toMap(ExamRequestParticipant::id,Function.identity()));
    var grouped=new LinkedHashMap<String, List<ParticipantExamAssignment>>();
    links.forEach(a->grouped.computeIfAbsent(a.vendorNameSnapshot()+"|"+a.examCodeSnapshot(),k->new ArrayList<>()).add(a));
    var exams=grouped.entrySet().stream().sorted(Map.Entry.comparingByKey()).map(e->{var a=e.getValue().get(0);var qty=e.getValue().size();return new ApprovalEmailModel.ExamSummary(a.vendorNameSnapshot(),a.examCodeSnapshot(),a.examNameSnapshot(),nvl(a.retakeSnapshot()),a.currencySnapshot(),a.unitPriceSnapshot(),qty,a.unitPriceSnapshot().multiply(BigDecimal.valueOf(qty)));}).toList();
    var sums=exams.stream().collect(Collectors.groupingBy(ApprovalEmailModel.ExamSummary::currency,TreeMap::new,Collectors.reducing(BigDecimal.ZERO,ApprovalEmailModel.ExamSummary::subtotal,BigDecimal::add))).entrySet().stream().map(e->new ApprovalEmailModel.CurrencyTotal(e.getKey(),e.getValue())).toList();
    var pviews=new ArrayList<ApprovalEmailModel.ParticipantSummary>(); int i=1; for(var p:people) pviews.add(new ApprovalEmailModel.ParticipantSummary(i++,p.fullName(),nvl(p.originalEmail())));
    var aviews=links.stream().sorted(Comparator.comparing((ParticipantExamAssignment a)->byId.get(a.participantId()).fullName()).thenComparing(ParticipantExamAssignment::examCodeSnapshot)).map(a->{var p=byId.get(a.participantId());return new ApprovalEmailModel.AssignmentSummary(p.fullName(),nvl(p.originalEmail()),a.examCodeSnapshot(),a.examNameSnapshot(),nvl(a.retakeSnapshot()),a.unitPriceSnapshot(),a.currencySnapshot());}).toList();
    var commercial=new ApprovalEmailModel.CommercialSummary(nvl(request.scheduledCourseCode()),"N/A","N/A","N/A",nvl(request.companyNameSnapshot()),nvl(request.billingReference()),nvl(request.salesAdvisorNameSnapshot()));
    return new ApprovalEmailModel(new ApprovalEmailModel.RequestSummary(request.id().toString(),request.createdAt(),submittedAt,request.status().name(),nvl(request.siteCodeSnapshot()),nvl(approverName)),new ApprovalEmailModel.RequesterSummary(nvl(request.requesterName()),nvl(request.requesterEmail())),commercial,List.copyOf(pviews),exams,aviews,sums,nvl(request.observations()));
  }
  private static String nvl(String s){return s==null||s.isBlank()?"N/A":s;}
}
