package com.netec.exams.catalog;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ExamCatalogService {
  private final ExamCatalogRepository repository;
  public ExamCatalogService(ExamCatalogRepository repository){this.repository=repository;}

  @Transactional(readOnly=true)
  public Page<ExamCatalogView> search(
      String vendor, String code, String query, Boolean active, int page, int size) {
    int safeSize=Math.min(Math.max(size,1),100);
    var pageable=PageRequest.of(Math.max(page,0),safeSize,
        Sort.by("vendor").ascending().and(Sort.by("examCode").ascending()));
    return repository.findAll(specification(
            clean(vendor), clean(code), clean(query), active), pageable)
        .map(ExamCatalogView::from);
  }

  @Transactional(readOnly=true)
  public ExamCatalogView get(UUID id) {
    return repository.findById(id).map(ExamCatalogView::from)
        .orElseThrow(ExamCatalogNotFoundException::new);
  }

  @Transactional(readOnly=true)
  public List<String> vendors(){return repository.findActiveVendors();}

  private static Specification<ExamCatalogItem> specification(
      String vendor, String code, String query, Boolean active) {
    return (root, criteriaQuery, builder) -> {
      List<Predicate> predicates = new ArrayList<>();
      if (active != null) {
        predicates.add(builder.equal(root.get("active"), active));
      }
      if (vendor != null) {
        predicates.add(builder.equal(
            builder.lower(root.get("vendor")), vendor.toLowerCase(Locale.ROOT)));
      }
      if (code != null) {
        predicates.add(builder.like(
            builder.lower(root.get("examCode")), contains(code)));
      }
      if (query != null) {
        String pattern = contains(query);
        predicates.add(builder.or(
            builder.like(builder.lower(root.get("vendor")), pattern),
            builder.like(builder.lower(root.get("courseName")), pattern),
            builder.like(builder.lower(root.get("examCode")), pattern),
            builder.like(builder.lower(root.get("examName")), pattern)));
      }
      return builder.and(predicates.toArray(Predicate[]::new));
    };
  }

  private static String contains(String value) {
    return "%" + value.toLowerCase(Locale.ROOT) + "%";
  }

  private static String clean(String value){return value==null||value.isBlank()?null:value.trim();}
}

class ExamCatalogNotFoundException extends RuntimeException {}
