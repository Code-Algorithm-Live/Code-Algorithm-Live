package com.ssafy.coala.domain.problem.domain;

import com.ssafy.coala.domain.problem.dto.ProblemDto;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CurateInfo {
    @Id
    String id;//memberId
    LocalDateTime lastUpdate;
//    List<Integer> recentId;
    List<ProblemDto> curateFromRecentProblem;
}
