package com.ssafy.coala.domain.problem.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

//@Entity
@Entity
public class Problem {
    public Integer getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public int getAccepted_user_count() {
        return accepted_user_count;
    }

    public int getLevel() {
        return level;
    }

    public boolean isGive_no_rating() {
        return give_no_rating;
    }

    public float getAverage_tries() {
        return average_tries;
    }

    public List<Tag> getTags() {
        return tags;
    }

    @Id
    private Integer id;
    private String title;
    private int accepted_user_count;
    private int level;
    private boolean give_no_rating;
    private float average_tries;

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    @OneToMany(mappedBy = "problem", cascade = CascadeType.ALL)
    private List<Tag> tags = new ArrayList<>();
    public Problem(){};

    public Problem(Integer id, String title, int accepted_user_count,
                   int level, boolean give_no_rating, float average_tries, List<Tag> tags) {
        this.id = id;
        this.title = title;
        this.accepted_user_count = accepted_user_count;
        this.level = level;
        this.give_no_rating = give_no_rating;
        this.average_tries = average_tries;
        this.tags = tags;
    }
}
