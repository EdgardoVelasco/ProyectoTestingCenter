package com.netec.exams.notification;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record ApprovalEmailModel(RequestSummary request, RequesterSummary requester,
    CommercialSummary commercial, List<ParticipantSummary> participants,
    List<ExamSummary> exams, List<AssignmentSummary> assignments,
    List<CurrencyTotal> totals, String observations) {
  public record RequestSummary(String folio, Instant createdAt, Instant submittedAt, String status, String siteCode, String approverName) {}
  public record RequesterSummary(String name, String upn) {}
  public record CommercialSummary(String scheduledCourseCode, String courseType, String segment, String costCenter, String company, String billingReference, String advisor) {}
  public record ParticipantSummary(int number, String name, String email) {}
  public record ExamSummary(String vendor, String code, String name, String retake, String currency, BigDecimal unitPrice, int quantity, BigDecimal subtotal) {}
  public record AssignmentSummary(String participant, String email, String code, String exam, String retake, BigDecimal unitPrice, String currency) {}
  public record CurrencyTotal(String currency, BigDecimal total) {}
}
