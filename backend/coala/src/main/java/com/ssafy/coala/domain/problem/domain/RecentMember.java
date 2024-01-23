package com.ssafy.coala.domain.problem.domain;

import jakarta.persistence.OneToOne;
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
public class RecentMember {

    @Id
    private Integer id; //problem_id
    private List<String> members;

    public List<String> add(String memberId){
        if (members.size()>4){
            members.remove(0);
        }
        members.add(memberId);

        return members;
    }
}
