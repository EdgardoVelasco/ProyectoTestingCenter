package com.netec.exams.approvalrouting.infrastructure.persistence.repository;

import com.netec.exams.approvalrouting.infrastructure.persistence.entity.ApprovalRoutingRule;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface ApprovalRoutingRuleRepository extends JpaRepository<ApprovalRoutingRule, UUID> {
    Optional<ApprovalRoutingRule> findBySiteCodeAndActiveTrue(String siteCode);
}
