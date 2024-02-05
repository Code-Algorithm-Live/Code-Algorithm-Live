package com.ssafy.coala.domain.problem.domain;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.redis.core.RedisHash;

import java.util.List;
import java.util.Map;

//@RedisHash("level_problem")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LevelProblem {
    @Id
    int level;
    Map<Integer,ProblemInfo> problemInfo;

    public void putProblem(Problem p){
        problemInfo.put(p.getId(),new ProblemInfo(p));
    }

}
