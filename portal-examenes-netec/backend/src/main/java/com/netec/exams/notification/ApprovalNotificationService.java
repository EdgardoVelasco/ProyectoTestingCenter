package com.netec.exams.notification;
import com.netec.exams.request.*; import java.time.*; import java.util.UUID; import org.springframework.beans.factory.annotation.Value; import org.springframework.stereotype.Service; import org.springframework.transaction.annotation.Transactional; import com.fasterxml.jackson.databind.ObjectMapper;
@Service public class ApprovalNotificationService {
 private final ApprovalRoutingRuleRepository routes; private final NotificationOutboxRepository outbox; private final String cc; private final ApprovalEmailModelFactory factory; private final ObjectMapper mapper;
 public ApprovalNotificationService(ApprovalRoutingRuleRepository r,NotificationOutboxRepository o,@Value("${app.notifications.testing-center-cc-group:}") String cc,ApprovalEmailModelFactory factory,ObjectMapper mapper){routes=r;outbox=o;this.cc=cc;this.factory=factory;this.mapper=mapper;}
 @Transactional public NotificationResult submit(ExamRequest request){
  if(request.siteCodeSnapshot()==null||request.siteCodeSnapshot().isBlank()) throw new IllegalStateException("APPROVAL_ROUTE_NOT_FOUND");
  if(cc.isBlank()||!cc.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) throw new IllegalStateException("GRAPH_CONFIGURATION_MISSING");
  var rule=routes.findBySiteCodeAndActiveTrue(request.siteCodeSnapshot().toUpperCase()).orElseThrow(()->new IllegalStateException("APPROVAL_ROUTE_NOT_FOUND"));
  var key="approval-exam-request:"+request.id()+":v"+request.version();
  if(outbox.findByIdempotencyKey(key).isEmpty()){try{var model=factory.create(request,rule.approverName(),Instant.now());outbox.save(NotificationOutbox.pending(request.id(),request.salesAdvisorUpnSnapshot(),rule.approverEmail(),cc,"[Solicitud de aprobación de exámenes] "+request.id()+" — "+request.siteCodeSnapshot(),mapper.writeValueAsString(model),key,Instant.now()));}catch(Exception ex){throw new IllegalStateException("EMAIL_MODEL_INCOMPLETE",ex);}}
  return new NotificationResult(request.id(),"PENDIENTE_NOTIFICACION",request.siteCodeSnapshot(),rule.approverName());
 }
 public record NotificationResult(UUID id,String status,String site,String approverName){}
}
