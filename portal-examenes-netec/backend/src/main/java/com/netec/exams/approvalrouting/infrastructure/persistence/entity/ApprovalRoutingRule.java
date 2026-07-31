package com.netec.exams.approvalrouting.infrastructure.persistence.entity;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "approval_routing_rule")
public class ApprovalRoutingRule {
    @Id
    private UUID id;
    @Column(name = "site_code", nullable = false, unique = true)
    private String siteCode;
    @Column(name = "site_name", nullable = false)
    private String siteName;
    @Column(name = "approver_name", nullable = false)
    private String approverName;
    @Column(name = "approver_email", nullable = false)
    private String approverEmail;
    private boolean active;
    @Column(name = "created_at")
    private Instant createdAt;
    @Column(name = "updated_at")
    private Instant updatedAt;
    @Version
    private long version;

    protected ApprovalRoutingRule() {
    }

    public UUID id() {
        return id;
    }

    public String siteCode() {
        return siteCode;
    }

    public String siteName() {
        return siteName;
    }

    public String approverName() {
        return approverName;
    }

    public String approverEmail() {
        return approverEmail;
    }

    public boolean active() {
        return active;
    }
}
