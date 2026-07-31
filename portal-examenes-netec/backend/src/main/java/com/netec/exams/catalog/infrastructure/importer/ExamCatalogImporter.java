package com.netec.exams.catalog.infrastructure.importer;

import com.netec.exams.catalog.infrastructure.persistence.entity.ExamCatalogItem;
import com.netec.exams.catalog.infrastructure.persistence.repository.ExamCatalogRepository;

import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.text.Normalizer;
import java.time.Clock;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;
import java.util.UUID;
import org.apache.commons.csv.CSVFormat;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class ExamCatalogImporter implements ApplicationRunner {
  private static final Logger LOGGER=LoggerFactory.getLogger(ExamCatalogImporter.class);
  private final ExamCatalogRepository repository;
  private final boolean enabled;
  private final Clock clock;

  @Autowired
  public ExamCatalogImporter(
      ExamCatalogRepository repository,
      @Value("${app.catalog.initial-import-enabled:true}") boolean enabled) {
    this(repository,enabled,Clock.systemUTC());
  }

  ExamCatalogImporter(ExamCatalogRepository repository, boolean enabled, Clock clock) {
    this.repository=repository; this.enabled=enabled; this.clock=clock;
  }

  @Override @Transactional
  public void run(ApplicationArguments args) throws Exception {
    if(!enabled) return;
    var resource=new ClassPathResource("data/catalogo_examenes.csv");
    int inserted=0,duplicates=0,rejected=0;
    Set<String> seen=new HashSet<>();
    try(var reader=new InputStreamReader(resource.getInputStream(),StandardCharsets.UTF_8);
        var records=CSVFormat.DEFAULT.builder().setHeader().setSkipHeaderRecord(true).get().parse(reader)) {
      for(var row:records) {
        try {
          String vendor=required(row.get("vendor"));
          String course=required(row.get("course_name"));
          String code=required(row.get("exam_code"));
          String name=required(row.get("exam_name"));
          BigDecimal cost=new BigDecimal(required(row.get("base_cost"))).setScale(4);
          if(cost.signum()<0) throw new IllegalArgumentException("negative cost");
          String retake=row.get("retake");
          String comments=row.get("comments");
          String key=businessKey(vendor,course,code,name,retake,cost,comments);
          if(!seen.add(key) || repository.findByBusinessKey(key).isPresent()) {duplicates++; continue;}
          int sourceRow=Integer.parseInt(row.get("source_row_number"));
          UUID id=UUID.nameUUIDFromBytes(("exam-catalog:"+key).getBytes(StandardCharsets.UTF_8));
          repository.save(ExamCatalogItem.imported(id,vendor,course,code,name,retake,
              cost,comments,key,sourceRow,clock.instant()));
          inserted++;
        } catch(RuntimeException ex) {
          rejected++;
          LOGGER.warn("Exam catalog source row rejected: category=INVALID_ROW");
        }
      }
    }
    LOGGER.info("Exam catalog import completed: inserted={}, duplicates={}, rejected={}",
        inserted,duplicates,rejected);
  }

  static String businessKey(
      String vendor,String course,String code,String name,String retake,
      BigDecimal cost,String comments) {
    return String.join("|",normalize(vendor),normalize(course),normalize(code),normalize(name),
        normalizeNullable(retake),cost.stripTrailingZeros().toPlainString(),normalizeNullable(comments));
  }
  private static String required(String value) {
    if(value==null||value.isBlank()) throw new IllegalArgumentException("required");
    return value.trim();
  }
  private static String normalize(String value) {
    return Normalizer.normalize(value.trim(),Normalizer.Form.NFKC).toLowerCase(Locale.ROOT);
  }
  private static String normalizeNullable(String value) {
    return value==null||value.isBlank() ? "" : normalize(value);
  }
}
