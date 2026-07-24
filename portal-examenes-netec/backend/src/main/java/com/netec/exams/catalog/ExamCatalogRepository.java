package com.netec.exams.catalog;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface ExamCatalogRepository extends JpaRepository<ExamCatalogItem, UUID>,
    JpaSpecificationExecutor<ExamCatalogItem> {
  Optional<ExamCatalogItem> findByBusinessKey(String businessKey);

  @Query("select distinct e.vendor from ExamCatalogItem e where e.active=true order by e.vendor")
  List<String> findActiveVendors();
}
