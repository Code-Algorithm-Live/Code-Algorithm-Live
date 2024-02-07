package com.ssafy.coala.domain.problem.dto;

import com.ssafy.coala.domain.problem.domain.Problem;
import com.ssafy.coala.domain.problem.domain.Tag;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ProblemDto implements Serializable {
    private Integer id;
    private String title;
    private int accepted_user_count;
    private int level;
    private float average_tries;
    private String description;

    private List<String> tags = new ArrayList<>();

    public ProblemDto(){};

    public ProblemDto (Problem p){
        this.id = p.getId();
        this.title = p.getTitle();
        this.accepted_user_count = p.getAccepted_user_count();
        this.level = p.getLevel();
        this.average_tries = p.getAverage_tries();
        this.description = p.getDescription();
        this.tags = new ArrayList<>();
        for (int i=0; i< p.getTags().size(); i++){
            tags.add(p.getTags().get(i).getName());
        }
    }
}
