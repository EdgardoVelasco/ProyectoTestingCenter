package com.netec.exams.catalog.application;

import com.netec.exams.catalog.infrastructure.persistence.entity.ExamCatalogItem;
import java.math.BigDecimal;
import java.util.UUID;

public record ExamCatalogView(
    UUID id, String vendor, String courseName, String examCode, String examName,
    String retake, BigDecimal baseCost, String baseCurrency, String comments, boolean active) {
  public static ExamCatalogView from(ExamCatalogItem item) {
    return new ExamCatalogView(item.id(), item.vendor(), item.courseName(), item.examCode(),
        item.examName(), item.retake(), item.baseCost(), item.baseCurrency(), item.comments(), item.active());
  }
}
