package com.netec.exams.request;

import jakarta.persistence.*;
import java.time.Instant;
import java.sql.Types;
import java.util.Locale;
import java.util.UUID;
import org.hibernate.annotations.JdbcTypeCode;

@Entity @Table(name="exam_request_participant")
public class ExamRequestParticipant {
  @Id private UUID id;
  @Column(name="exam_request_id",nullable=false) private UUID examRequestId;
  @Column(name="first_name",nullable=false,length=100) private String firstName;
  @Column(name="last_name",nullable=false,length=100) private String lastName;
  @Column(name="second_last_name",length=100) private String secondLastName;
  @Column(name="normalized_email",nullable=false,length=254) private String normalizedEmail;
  @Column(name="original_email",nullable=false,length=254) private String originalEmail;
  @Column(name="external_participant_id",length=80) private String externalParticipantId;
  @JdbcTypeCode(Types.CHAR) @Column(length=2,columnDefinition="char(2)") private String country;
  @Column(length=120) private String city;
  @Column(name="created_at",nullable=false) private Instant createdAt;
  @Column(name="updated_at",nullable=false) private Instant updatedAt;
  @Version private long version;
  protected ExamRequestParticipant(){}
  static ExamRequestParticipant create(UUID requestId,ParticipantInput input,Instant now) {
    var x=new ExamRequestParticipant(); x.id=input.id()==null?UUID.randomUUID():input.id();
    x.examRequestId=requestId; x.firstName=value(input.firstName()); x.lastName=value(input.lastName());
    x.secondLastName=clean(input.secondLastName()); x.originalEmail=value(input.email());
    x.normalizedEmail=x.originalEmail.isBlank()?"__draft__"+x.id:x.originalEmail.toLowerCase(Locale.ROOT);
    x.externalParticipantId=clean(input.externalParticipantId()); x.country=clean(input.country());
    x.city=clean(input.city()); x.createdAt=now; x.updatedAt=now; return x;
  }
  private static String clean(String value){return value==null||value.isBlank()?null:value.trim();}
  private static String value(String value){return value==null?"":value.trim();}
  public UUID id(){return id;} public String normalizedEmail(){return normalizedEmail;} public String originalEmail(){return originalEmail;} public String fullName(){return (firstName+" "+lastName+(secondLastName==null?"":" "+secondLastName)).trim();}
}
