package com.netec.exams.notification;
import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface ApprovalRoutingRuleRepository extends JpaRepository<ApprovalRoutingRule,UUID>{ Optional<ApprovalRoutingRule> findBySiteCodeAndActiveTrue(String siteCode); }
