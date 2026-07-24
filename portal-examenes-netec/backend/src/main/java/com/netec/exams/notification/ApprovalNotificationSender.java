package com.netec.exams.notification;
public interface ApprovalNotificationSender { void send(NotificationOutbox notification, ApprovalEmailTemplateRenderer.RenderedEmail rendered); }
