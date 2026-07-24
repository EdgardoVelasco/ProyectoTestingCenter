package com.netec.exams.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Size;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

record ParticipantInput(UUID id,@Size(max=100) String firstName,
    @Size(max=100) String lastName,@Size(max=100) String secondLastName,
    @Size(max=254) String email,@Size(max=80) String externalParticipantId,
    @Size(min=2,max=2) String country,@Size(max=120) String city) {}
record ExamAssignmentInput(UUID examCatalogId,@Size(min=1,max=100) List<UUID> participantIds) {}
record DraftCommand(@Size(max=80) String scheduledCourseCode,String companyName,@Size(max=250) String billingReference,
    @Size(max=2000) String observations,@Valid @Size(max=100) List<ParticipantInput> participants,
    @Valid @Size(max=100) List<ExamAssignmentInput> examAssignments) {
  List<ParticipantInput> safeParticipants(){return participants==null?List.of():participants;}
  List<ExamAssignmentInput> safeAssignments(){return examAssignments==null?List.of():examAssignments;}
}
record Requester(String id,String name,String email,String area,String businessUnit) {}
record RequesterView(String id,String name,String email,String area,String businessUnit) {}
record SalesAdvisorView(String id,String name,String userPrincipalName) {}
record ExamRequestView(UUID id,ExamRequestStatus status,RequesterView requester,SalesAdvisorView salesAdvisor,String scheduledCourseCode,String companyNameSnapshot,String billingReference,String observations,Instant createdAt,Instant updatedAt,long version) {
  static ExamRequestView from(ExamRequest x){return new ExamRequestView(x.id(),x.status(),new RequesterView(x.requesterId(),x.requesterName(),x.requesterEmail(),x.requesterArea(),x.requesterBusinessUnit()),new SalesAdvisorView(x.salesAdvisorUserId(),x.salesAdvisorNameSnapshot(),x.salesAdvisorUpnSnapshot()),x.scheduledCourseCode(),x.companyNameSnapshot(),x.billingReference(),x.observations(),x.createdAt(),x.updatedAt(),x.version());}
}
class InvalidStateException extends RuntimeException {}
class NotFoundException extends RuntimeException {}
class InvalidDraftException extends RuntimeException {}
class InvalidCompanyNameException extends RuntimeException {}
