package com.ssafy.coala.domain.problem.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RecentProblem {

    @Id
    private String id; //member_id
    private List<Integer> problems;

    public List<Integer> add(int problem){
        if (problems.size()>4){
            problems.remove(0);
        }
        problems.add(problem);

        return problems;
    }
}
