package com.netec.exams.notification.application;

import com.netec.exams.notification.infrastructure.outbox.NotificationOutbox;
import com.netec.exams.notification.infrastructure.template.ApprovalEmailTemplateRenderer;
public interface ApprovalNotificationSender { void send(NotificationOutbox notification, ApprovalEmailTemplateRenderer.RenderedEmail rendered); }
