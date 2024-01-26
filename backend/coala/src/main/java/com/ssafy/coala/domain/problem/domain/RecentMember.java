package com.ssafy.coala.domain.problem.domain;

import com.ssafy.coala.domain.problem.dto.ProblemDto;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecentMember {

    @Id
    Integer id;



}
