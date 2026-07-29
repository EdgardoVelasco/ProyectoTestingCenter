package com.netec.exams.examrequest;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ExamRequestParticipantRepository extends JpaRepository<ExamRequestParticipant,UUID> {
  void deleteByExamRequestId(UUID examRequestId);
  java.util.List<ExamRequestParticipant> findByExamRequestId(UUID examRequestId);
}
