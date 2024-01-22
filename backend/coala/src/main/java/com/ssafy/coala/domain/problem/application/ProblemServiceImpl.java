package com.ssafy.coala.domain.problem.application;

import com.ssafy.coala.domain.problem.dao.ProblemRepository;
import com.ssafy.coala.domain.problem.domain.Problem;
import com.ssafy.coala.domain.problem.domain.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProblemServiceImpl implements ProblemService {
    @Autowired
    ProblemRepository problemRepository;


    @Override
    public List<Problem> InsertProblem(List<Problem> list) {
        return problemRepository.saveAll(list);
    }

    @Override
    public Integer MaxId() {
        return problemRepository.findMaxId();
    }

}
