package com.netec.exams.examrequest;
import java.util.Optional; import java.util.UUID; import org.springframework.data.jpa.repository.JpaRepository;
interface ExamRequestRepository extends JpaRepository<ExamRequest,UUID> { Optional<ExamRequest> findByIdAndRequesterId(UUID id,String requesterId); }
