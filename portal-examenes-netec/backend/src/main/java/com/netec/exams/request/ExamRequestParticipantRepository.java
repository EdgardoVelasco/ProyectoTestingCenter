package com.netec.exams.request;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
interface ExamRequestParticipantRepository extends JpaRepository<ExamRequestParticipant,UUID> {
  void deleteByExamRequestId(UUID examRequestId);
}

