package com.netec.exams.request;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
interface ParticipantExamAssignmentRepository extends JpaRepository<ParticipantExamAssignment,UUID> {
  void deleteByExamRequestId(UUID examRequestId);
}

