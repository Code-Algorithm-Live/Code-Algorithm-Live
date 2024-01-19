package com.ssafy.coala.domain.problem.dto;

import com.ssafy.coala.domain.problem.domain.Problem;
import com.ssafy.coala.domain.problem.domain.Tag;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Getter
public class ProblemDto implements Serializable {
    private Integer id;
    private String title;
    private int accepted_user_count;
    private int level;
    private boolean give_no_rating;
    private float average_tries;
    private List<String> tags = new ArrayList<>();
    public ProblemDto(){};

    public ProblemDto (Problem p){
        this.id = p.getId();
        this.title = p.getTitle();
        this.accepted_user_count = p.getAccepted_user_count();
        this.level = p.getLevel();
        this.give_no_rating = p.isGive_no_rating();
        this.average_tries = p.getAverage_tries();
        this.tags = new ArrayList<>();
        for (int i=0; i< p.getTags().size(); i++){
            tags.add(p.getTags().get(i).getName());
        }
    }
    public ProblemDto(Integer id, String title, int accepted_user_count,
                   int level, boolean give_no_rating, float average_tries, List<String> tags) {
        this.id = id;
        this.title = title;
        this.accepted_user_count = accepted_user_count;
        this.level = level;
        this.give_no_rating = give_no_rating;
        this.average_tries = average_tries;
        this.tags = tags;
    }
}
