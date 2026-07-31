package com.netec.exams.examrequest;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity @Table(name="exam_request")
public class ExamRequest {
  @Id private UUID id;
  @Enumerated(EnumType.STRING) @Column(nullable=false,length=30) private ExamRequestStatus status;
  @Column(name="requester_id",nullable=false,length=128) private String requesterId;
  @Column(name="requester_name",nullable=false,length=160) private String requesterName;
  @Column(name="requester_email",nullable=false,length=254) private String requesterEmail;
  @Column(name="requester_area",length=120) private String requesterArea;
  @Column(name="requester_business_unit",length=120) private String requesterBusinessUnit;
  @Column(name="sales_advisor_user_id",nullable=false,length=128) private String salesAdvisorUserId;
  @Column(name="sales_advisor_name_snapshot",nullable=false,length=160) private String salesAdvisorNameSnapshot;
  @Column(name="sales_advisor_upn_snapshot",nullable=false,length=254) private String salesAdvisorUpnSnapshot;
  @Column(name="scheduled_course_code",length=80) private String scheduledCourseCode;
  @Column(name="course_type",length=120) private String courseType;
  @Column(name="segment",length=120) private String segment;
  @Column(name="cost_center",length=160) private String costCenter;
  @Column(name="site_code_snapshot",length=20) private String siteCodeSnapshot;
  @Column(name="company_name_snapshot",length=150) private String companyNameSnapshot;
  @Column(name="billing_reference",length=250) private String billingReference;
  @Column(length=2000) private String observations;
  @Column(name="created_at",nullable=false,updatable=false) private Instant createdAt;
  @Column(name="updated_at",nullable=false) private Instant updatedAt;
  @Version private long version;
  protected ExamRequest() {}
  public static ExamRequest draft(Requester r, DraftCommand c, Instant now) { var x=new ExamRequest(); x.id=UUID.randomUUID(); x.status=ExamRequestStatus.BORRADOR; x.requesterId=r.id(); x.requesterName=r.name(); x.requesterEmail=r.email(); x.requesterArea=r.area(); x.requesterBusinessUnit=r.businessUnit(); x.salesAdvisorUserId=r.id(); x.salesAdvisorNameSnapshot=r.name(); x.salesAdvisorUpnSnapshot=r.email(); x.createdAt=now; x.updatedAt=now; x.apply(c,now); return x; }
  public void apply(DraftCommand c, Instant now) { if(status!=ExamRequestStatus.BORRADOR) throw new InvalidStateException(); scheduledCourseCode=trim(c.scheduledCourseCode()); courseType=trim(c.courseType()); segment=trim(c.segment()); costCenter=trim(c.costCenter()); siteCodeSnapshot=trim(c.siteCode()); companyNameSnapshot=company(c.companyName()); billingReference=trim(c.billingReference()); observations=trim(c.observations()); updatedAt=now; }
  private static String trim(String v){ return v==null||v.isBlank()?null:v.trim(); }
  static String company(String value){if(value==null||value.isBlank())return null;String normalized=value.trim().replaceAll("\\s+"," ");if(normalized.length()<2||normalized.length()>150||normalized.equalsIgnoreCase("N/A"))throw new InvalidCompanyNameException();return normalized;}
  public UUID id(){return id;} public ExamRequestStatus status(){return status;} public String requesterId(){return requesterId;} public String requesterName(){return requesterName;} public String requesterEmail(){return requesterEmail;} public String requesterArea(){return requesterArea;} public String requesterBusinessUnit(){return requesterBusinessUnit;} public String salesAdvisorUserId(){return salesAdvisorUserId;} public String salesAdvisorNameSnapshot(){return salesAdvisorNameSnapshot;} public String salesAdvisorUpnSnapshot(){return salesAdvisorUpnSnapshot;} public String scheduledCourseCode(){return scheduledCourseCode;} public String courseType(){return courseType;} public String segment(){return segment;} public String costCenter(){return costCenter;} public String siteCodeSnapshot(){return siteCodeSnapshot;} public String companyNameSnapshot(){return companyNameSnapshot;} public String billingReference(){return billingReference;} public String observations(){return observations;} public Instant createdAt(){return createdAt;} public Instant updatedAt(){return updatedAt;} public long version(){return version;}
}
