package com.netec.exams.catalog;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;
import java.sql.Types;
import org.hibernate.annotations.JdbcTypeCode;

@Entity
@Table(name = "exam_catalog")
public class ExamCatalogItem {
  @Id private UUID id;
  @Column(nullable=false,length=120) private String vendor;
  @Column(name="course_name",nullable=false,length=250) private String courseName;
  @Column(name="exam_code",nullable=false,length=100) private String examCode;
  @Column(name="exam_name",nullable=false,length=500) private String examName;
  @Column(length=120) private String retake;
  @Column(name="base_cost",nullable=false,precision=19,scale=4) private BigDecimal baseCost;
  @JdbcTypeCode(Types.CHAR)
  @Column(name="base_currency",nullable=false,columnDefinition="char(3)") private String baseCurrency;
  @Column(columnDefinition="text") private String comments;
  @Column(nullable=false) private boolean active;
  @Column(name="business_key",nullable=false,length=700,unique=true) private String businessKey;
  @Column(name="source_file",nullable=false,length=255) private String sourceFile;
  @Column(name="source_row_number",nullable=false) private int sourceRowNumber;
  @Column(name="imported_at",nullable=false) private Instant importedAt;
  @Column(name="created_at",nullable=false,updatable=false) private Instant createdAt;
  @Column(name="updated_at",nullable=false) private Instant updatedAt;
  @Version private long version;

  protected ExamCatalogItem() {}

  public static ExamCatalogItem imported(
      UUID id, String vendor, String course, String code, String name, String retake,
      BigDecimal cost, String comments, String key, int row, Instant now) {
    var item = new ExamCatalogItem();
    item.id=id; item.vendor=vendor; item.courseName=course; item.examCode=code;
    item.examName=name; item.retake=blankToNull(retake); item.baseCost=cost;
    item.baseCurrency="USD"; item.comments=blankToNull(comments); item.active=true;
    item.businessKey=key; item.sourceFile="catalogo_examenes.xlsx";
    item.sourceRowNumber=row; item.importedAt=now; item.createdAt=now; item.updatedAt=now;
    return item;
  }

  private static String blankToNull(String value) {
    return value == null || value.isBlank() ? null : value.trim();
  }

  public UUID id(){return id;} public String vendor(){return vendor;}
  public String courseName(){return courseName;} public String examCode(){return examCode;}
  public String examName(){return examName;} public String retake(){return retake;}
  public BigDecimal baseCost(){return baseCost;} public String baseCurrency(){return baseCurrency;}
  public String comments(){return comments;} public boolean active(){return active;}
  public String businessKey(){return businessKey;}
}
