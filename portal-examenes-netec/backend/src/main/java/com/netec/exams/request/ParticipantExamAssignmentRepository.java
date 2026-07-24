package com.netec.exams.request;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ParticipantExamAssignmentRepository extends JpaRepository<ParticipantExamAssignment,UUID> {
  void deleteByExamRequestId(UUID examRequestId);
  java.util.List<ParticipantExamAssignment> findByExamRequestId(UUID examRequestId);
}
