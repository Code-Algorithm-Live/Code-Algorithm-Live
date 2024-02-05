package com.ssafy.coala.domain.problem.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProblemInfo implements Serializable {
    int questionCnt;
    List<String> tags;


    public ProblemInfo(Problem p){
        questionCnt = p.getQuestion_cnt();
        tags = new ArrayList<>();
        for (Tag t: p.getTags()){
            tags.add(t.getName());
        }
    }
}
