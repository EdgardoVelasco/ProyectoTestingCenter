package com.netec.exams.request;

import com.netec.exams.catalog.ExamCatalogItem;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.sql.Types;
import java.time.Instant;
import java.util.UUID;
import org.hibernate.annotations.JdbcTypeCode;

@Entity @Table(name="participant_exam_assignment")
class ParticipantExamAssignment {
  @Id private UUID id;
  @Column(name="exam_request_id",nullable=false) private UUID examRequestId;
  @Column(name="participant_id",nullable=false) private UUID participantId;
  @Column(name="exam_catalog_id",nullable=false) private UUID examCatalogId;
  @Column(name="unit_price_snapshot",nullable=false,precision=19,scale=4) private BigDecimal unitPriceSnapshot;
  @JdbcTypeCode(Types.CHAR) @Column(name="currency_snapshot",nullable=false,columnDefinition="char(3)") private String currencySnapshot;
  @Column(name="exam_code_snapshot",nullable=false,length=100) private String examCodeSnapshot;
  @Column(name="exam_name_snapshot",nullable=false,length=500) private String examNameSnapshot;
  @Column(name="vendor_name_snapshot",nullable=false,length=120) private String vendorNameSnapshot;
  @Column(name="retake_snapshot",length=120) private String retakeSnapshot;
  @Column(name="comments_snapshot",columnDefinition="text") private String commentsSnapshot;
  @Column(name="created_at",nullable=false) private Instant createdAt;
  @Column(name="updated_at",nullable=false) private Instant updatedAt;
  @Version private long version;
  protected ParticipantExamAssignment(){}
  static ParticipantExamAssignment create(UUID requestId,UUID participantId,ExamCatalogItem exam,Instant now) {
    var x=new ParticipantExamAssignment(); x.id=UUID.randomUUID(); x.examRequestId=requestId;
    x.participantId=participantId; x.examCatalogId=exam.id(); x.unitPriceSnapshot=exam.baseCost();
    x.currencySnapshot=exam.baseCurrency(); x.examCodeSnapshot=exam.examCode();
    x.examNameSnapshot=exam.examName(); x.vendorNameSnapshot=exam.vendor();
    x.retakeSnapshot=exam.retake(); x.commentsSnapshot=exam.comments();
    x.createdAt=now; x.updatedAt=now; return x;
  }
}

