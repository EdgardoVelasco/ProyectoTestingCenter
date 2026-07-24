package com.netec.exams.catalog;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/exam-catalog")
public class ExamCatalogController {
  private final ExamCatalogService service;
  public ExamCatalogController(ExamCatalogService service){this.service=service;}

  @GetMapping
  Page<ExamCatalogView> search(
      @RequestParam(required=false) String vendor,
      @RequestParam(required=false) String code,
      @RequestParam(required=false) String query,
      @RequestParam(defaultValue="true") Boolean active,
      @RequestParam(defaultValue="0") int page,
      @RequestParam(defaultValue="25") int size) {
    return service.search(vendor,code,query,active,page,size);
  }

  @GetMapping("/vendors")
  List<String> vendors(){return service.vendors();}

  @GetMapping("/{id}")
  ExamCatalogView get(@PathVariable UUID id){return service.get(id);}

  @ExceptionHandler(ExamCatalogNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  void notFound(){}
}

record ExamCatalogView(
    UUID id, String vendor, String courseName, String examCode, String examName,
    String retake, BigDecimal baseCost, String baseCurrency, String comments, boolean active) {
  static ExamCatalogView from(ExamCatalogItem item) {
    return new ExamCatalogView(item.id(),item.vendor(),item.courseName(),item.examCode(),
        item.examName(),item.retake(),item.baseCost(),item.baseCurrency(),item.comments(),item.active());
  }
}

