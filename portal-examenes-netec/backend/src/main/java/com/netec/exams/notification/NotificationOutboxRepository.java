package com.netec.exams.notification;
import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface NotificationOutboxRepository extends JpaRepository<NotificationOutbox,UUID>{ Optional<NotificationOutbox> findByIdempotencyKey(String key); List<NotificationOutbox> findTop20ByStatusAndNextAttemptAtLessThanEqualOrderByCreatedAtAsc(String status,java.time.Instant now); }
