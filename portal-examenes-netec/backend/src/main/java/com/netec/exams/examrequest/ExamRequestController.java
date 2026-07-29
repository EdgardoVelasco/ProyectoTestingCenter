package com.netec.exams.examrequest;

import com.netec.exams.security.*; import com.netec.exams.notification.ApprovalNotificationService; import jakarta.validation.Valid; import java.net.URI; import java.security.Principal; import java.util.UUID;
import org.springframework.http.*; import org.springframework.security.core.Authentication; import org.springframework.security.oauth2.jwt.Jwt; import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/v1/exam-requests")
class ExamRequestController {
  private final ExamRequestService service; private final ApprovalNotificationService notifications; ExamRequestController(ExamRequestService service,ApprovalNotificationService notifications){this.service=service;this.notifications=notifications;}
  @PostMapping ResponseEntity<ExamRequestView> create(@Valid @RequestBody DraftCommand command,Authentication auth){var v=service.create(requester(auth),command);return ResponseEntity.created(URI.create("/api/v1/exam-requests/"+v.id())).eTag(etag(v.version())).body(v);}
  @GetMapping("/{id}") ResponseEntity<ExamRequestView> get(@PathVariable UUID id,Authentication auth){var v=service.get(id,requester(auth));return ResponseEntity.ok().eTag(etag(v.version())).body(v);}
  @PutMapping("/{id}") ResponseEntity<ExamRequestView> update(@PathVariable UUID id,@RequestHeader("If-Match") String ifMatch,@Valid @RequestBody DraftCommand command,Authentication auth){var v=service.update(id,version(ifMatch),requester(auth),command);return ResponseEntity.ok().eTag(etag(v.version())).body(v);}
  @PostMapping("/{id}/submit") ResponseEntity<ApprovalNotificationService.NotificationResult> submit(@PathVariable UUID id,Authentication auth){var x=service.entity(id,requester(auth));return ResponseEntity.ok(notifications.submit(x));}
  private Requester requester(Authentication a){Object p=a.getPrincipal(); if(p instanceof LocalPrincipal l)return new Requester(l.id(),l.name(),l.email(),l.area(),l.businessUnit()); Jwt j=(Jwt)p; return new Requester(value(j,"oid",j.getSubject()),value(j,"name","Usuario"),IdentityClaims.userPrincipalName(j),value(j,"department",null),value(j,"extension_businessUnit",null));}
  private static String value(Jwt j,String key,String fallback){String v=j.getClaimAsString(key);return v==null||v.isBlank()?fallback:v;}
  private static long version(String e){try{return Long.parseLong(e.replace("W/","").replace("\"",""));}catch(Exception ex){throw new IllegalArgumentException("If-Match inválido");}}
  private static String etag(long v){return "\""+v+"\"";}
}
