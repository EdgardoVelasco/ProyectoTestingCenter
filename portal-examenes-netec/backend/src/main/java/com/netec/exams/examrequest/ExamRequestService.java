package com.netec.exams.examrequest;

import com.netec.exams.audit.*;
import com.netec.exams.catalog.ExamCatalogRepository;
import com.netec.exams.catalog.ExamCatalogItem;
import java.time.*;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
class ExamRequestService {
  private final ExamRequestRepository repository; private final AuditRepository audit;
  private final ExamRequestParticipantRepository participants;
  private final ParticipantExamAssignmentRepository assignments;
  private final ExamCatalogRepository catalog; private final Clock clock;
  @Autowired ExamRequestService(ExamRequestRepository r,AuditRepository a,
      ExamRequestParticipantRepository p,ParticipantExamAssignmentRepository asg,
      ExamCatalogRepository c){this(r,a,p,asg,c,Clock.systemUTC());}
  ExamRequestService(ExamRequestRepository r,AuditRepository a,ExamRequestParticipantRepository p,
      ParticipantExamAssignmentRepository asg,ExamCatalogRepository c,Clock clock){
    repository=r;audit=a;participants=p;assignments=asg;catalog=c;this.clock=clock;}

  @Transactional ExamRequestView create(Requester r,DraftCommand c){
    var now=Instant.now(clock);var x=repository.save(ExamRequest.draft(r,c,now));syncDetails(x.id(),c,now);
    audit.save(new AuditEntry(x.id(),r.id(),"DRAFT_CREATED",now));return ExamRequestView.from(x);}
  @Transactional ExamRequestView update(UUID id,long expected,Requester r,DraftCommand c){
    var x=own(id,r);if(x.version()!=expected)throw new ObjectOptimisticLockingFailureException(ExamRequest.class,id);
    var now=Instant.now(clock);x.apply(c,now);var saved=repository.saveAndFlush(x);syncDetails(id,c,now);
    audit.save(new AuditEntry(id,r.id(),"DRAFT_UPDATED",now));return ExamRequestView.from(saved);}
  @Transactional(readOnly=true)ExamRequestView get(UUID id,Requester r){return ExamRequestView.from(own(id,r));}
  @Transactional(readOnly=true) ExamRequest entity(UUID id,Requester r){return own(id,r);}
  private ExamRequest own(UUID id,Requester r){return repository.findByIdAndRequesterId(id,r.id()).orElseThrow(NotFoundException::new);}

  private void syncDetails(UUID requestId,DraftCommand command,Instant now){
    Set<UUID> ids=new HashSet<>();Set<String> emails=new HashSet<>();
    var people=new ArrayList<ExamRequestParticipant>();
    for(var input:command.safeParticipants()){
      var person=ExamRequestParticipant.create(requestId,input,now);
      if(!ids.add(person.id())||!emails.add(person.normalizedEmail()))throw new InvalidDraftException();
      people.add(person);
    }
    var links=new ArrayList<ParticipantExamAssignment>();Set<String> unique=new HashSet<>();
    for(var group:command.safeAssignments()){
      if(group.examCatalogId()==null||group.participantIds()==null)throw new InvalidDraftException();
      var exam=catalog.findById(group.examCatalogId()).filter(ExamCatalogItem::active)
          .orElseThrow(InvalidDraftException::new);
      for(UUID participantId:group.participantIds()){
        if(!ids.contains(participantId)||!unique.add(participantId+"|"+exam.id()))throw new InvalidDraftException();
        links.add(ParticipantExamAssignment.create(requestId,participantId,exam,now));
      }
    }
    assignments.deleteByExamRequestId(requestId);assignments.flush();
    participants.deleteByExamRequestId(requestId);participants.flush();
    participants.saveAll(people);assignments.saveAll(links);
  }
}
