package com.ssafy.coala.domain.problem.application;

import com.ssafy.coala.domain.problem.dao.ProblemRepository;
import com.ssafy.coala.domain.problem.dao.RecentProblemRepository;
import com.ssafy.coala.domain.problem.domain.Problem;
import com.ssafy.coala.domain.problem.domain.RecentProblem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.*;

@Service
public class ProblemServiceImpl implements ProblemService {
    @Autowired
    ProblemRepository problemRepository;
    @Autowired
    RecentProblemRepository recentProblemRepository;

    @Override
    public List<Problem> insertProblem(List<Problem> list) {
        return problemRepository.saveAll(list);
    }

    @Override
    public Integer maxId() {
        return problemRepository.findMaxId();
    }


    @Override
    public RecentProblem updateRecentProblem(RecentProblem inputRP) {
        Optional<RecentProblem> preProblem = recentProblemRepository.findById(inputRP.getId());
        if (preProblem.isPresent()) {
            List<Integer> list = inputRP.getProblems();
            if (list.size()<5){//5개보다 적다면 이전 리스트에서 문제를 찾아본다.
                List<Integer> preList = preProblem.get().getProblems();
                for (int pid:preList){
                    if (!list.contains(pid)){
                        list.add(pid);
                        if (list.size()==5) break;
                    }
                }
            }
        }

        return recentProblemRepository.save(inputRP);
    }

}
