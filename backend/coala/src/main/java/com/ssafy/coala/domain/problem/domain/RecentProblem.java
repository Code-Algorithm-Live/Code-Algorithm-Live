package com.ssafy.coala.domain.problem.domain;

import com.ssafy.coala.domain.problem.dto.ProblemDto;
import jakarta.persistence.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document
public class RecentProblem {
    @Id
    String id;//memberId
    LocalDateTime lastUpdate;
    List<Integer> recentProblem;
    List<ProblemDto> curateProblem;
}
