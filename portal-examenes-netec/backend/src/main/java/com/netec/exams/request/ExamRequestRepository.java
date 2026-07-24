package com.netec.exams.request;
import java.util.Optional; import java.util.UUID; import org.springframework.data.jpa.repository.JpaRepository;
interface ExamRequestRepository extends JpaRepository<ExamRequest,UUID> { Optional<ExamRequest> findByIdAndRequesterId(UUID id,String requesterId); }
