package com.netec.exams.notification;
import com.netec.exams.request.*; import java.time.*; import java.util.UUID; import org.springframework.beans.factory.annotation.Value; import org.springframework.stereotype.Service; import org.springframework.transaction.annotation.Transactional;
@Service public class ApprovalNotificationService {
 private final ApprovalRoutingRuleRepository routes; private final NotificationOutboxRepository outbox; private final String cc;
 public ApprovalNotificationService(ApprovalRoutingRuleRepository r,NotificationOutboxRepository o,@Value("${app.notifications.testing-center-cc-group:}") String cc){routes=r;outbox=o;this.cc=cc;}
 @Transactional public NotificationResult submit(ExamRequest request){
  if(request.siteCodeSnapshot()==null||request.siteCodeSnapshot().isBlank()) throw new IllegalStateException("APPROVAL_ROUTE_NOT_FOUND");
  if(cc.isBlank()||!cc.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) throw new IllegalStateException("GRAPH_CONFIGURATION_MISSING");
  var rule=routes.findBySiteCodeAndActiveTrue(request.siteCodeSnapshot().toUpperCase()).orElseThrow(()->new IllegalStateException("APPROVAL_ROUTE_NOT_FOUND"));
  var key="approval-exam-request:"+request.id()+":v"+request.version();
  if(outbox.findByIdempotencyKey(key).isEmpty()) outbox.save(NotificationOutbox.pending(request.id(),request.salesAdvisorUpnSnapshot(),rule.approverEmail(),cc,"[Solicitud de aprobacion de examen] "+request.id()+" — "+request.siteCodeSnapshot(),"Folio: pendiente\nSolicitante: "+request.requesterName()+"\nEmpresa: "+request.companyNameSnapshot(),key,Instant.now()));
  return new NotificationResult(request.id(),"PENDIENTE_NOTIFICACION",request.siteCodeSnapshot(),rule.approverName());
 }
 public record NotificationResult(UUID id,String status,String site,String approverName){}
}
