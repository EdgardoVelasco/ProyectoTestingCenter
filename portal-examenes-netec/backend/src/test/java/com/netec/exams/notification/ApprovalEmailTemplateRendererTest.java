package com.netec.exams.notification;

import static org.junit.jupiter.api.Assertions.*;
import java.math.BigDecimal;
import java.util.List;
import org.junit.jupiter.api.Test;

class ApprovalEmailTemplateRendererTest {
  @Test void rendersStructuredHtmlAndPlainTextWithoutUnsafeMarkup(){
    var model=new ApprovalEmailModel(
      new ApprovalEmailModel.RequestSummary("EXA-1",null,null,"PENDIENTE_NOTIFICACION","BOG","Felipe"),
      new ApprovalEmailModel.RequesterSummary("Adele <Admin>","adele@example.test"),
      new ApprovalEmailModel.CommercialSummary("N/A","N/A","CN","N/A","Empresa & Uno","REF-1","Adele"),
      List.of(new ApprovalEmailModel.ParticipantSummary(1,"Carlos","carlos@example.test")),
      List.of(new ApprovalEmailModel.ExamSummary("Microsoft","AZ-900","Azure Fundamentals","No","USD",new BigDecimal("59"),1,new BigDecimal("59"))),
      List.of(new ApprovalEmailModel.AssignmentSummary("Carlos","carlos@example.test","AZ-900","Azure Fundamentals","No",new BigDecimal("59"),"USD")),
      List.of(new ApprovalEmailModel.CurrencyTotal("USD",new BigDecimal("59"))),"<script>alert(1)</script>\nNota");
    var rendered=new ApprovalEmailTemplateRenderer().render(model);
    assertTrue(rendered.html().contains("&lt;script&gt;"));
    assertFalse(rendered.html().contains("<script>"));
    assertTrue(rendered.html().contains("Total USD"));
    assertTrue(rendered.text().contains("AZ-900"));
    assertTrue(rendered.text().contains("TOTAL USD"));
  }
}
