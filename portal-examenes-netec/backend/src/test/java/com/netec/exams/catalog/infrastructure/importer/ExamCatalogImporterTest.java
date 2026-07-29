package com.netec.exams.catalog.infrastructure.importer;

import com.netec.exams.catalog.infrastructure.persistence.entity.ExamCatalogItem;
import com.netec.exams.catalog.infrastructure.persistence.repository.ExamCatalogRepository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

import java.time.*;
import java.util.Optional;
import org.junit.jupiter.api.Test;

class ExamCatalogImporterTest {
  @Test
  void imports119UniqueRowsAndSkipsFiveExactDuplicates() throws Exception {
    ExamCatalogRepository repository=mock(ExamCatalogRepository.class);
    when(repository.findByBusinessKey(anyString())).thenReturn(Optional.empty());
    var importer=new ExamCatalogImporter(repository,true,
        Clock.fixed(Instant.parse("2026-07-23T00:00:00Z"),ZoneOffset.UTC));

    importer.run(null);

    verify(repository,times(119)).save(any(ExamCatalogItem.class));
  }

  @Test
  void fingerprintDistinguishesSameCodeWithDifferentCost() {
    String first=ExamCatalogImporter.businessKey(
        "Microsoft","Azure Fundamentals","AZ-900","Azure Fundamentals",
        "No incluido",new java.math.BigDecimal("59"),null);
    String second=ExamCatalogImporter.businessKey(
        "Microsoft","Azure Fundamentals","AZ-900","Azure Fundamentals",
        "No incluido",new java.math.BigDecimal("69"),null);
    assertThat(first).isNotEqualTo(second);
  }
}

