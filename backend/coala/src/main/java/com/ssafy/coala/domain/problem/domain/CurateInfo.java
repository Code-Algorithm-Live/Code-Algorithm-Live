package com.ssafy.coala.domain.problem.domain;

import com.ssafy.coala.domain.problem.dto.ProblemDto;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.redis.core.RedisHash;

import java.time.LocalDateTime;
import java.util.List;

@RedisHash("curate_info")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CurateInfo {
    @Id
    String id;//solvedId
    List<ProblemDto> curateFromRecent;
    List<ProblemDto> curateFromQuestionCnt;
}
