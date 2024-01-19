package com.ssafy.coala.domain.problem.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.coala.domain.problem.application.ProblemService;
import com.ssafy.coala.domain.problem.domain.Problem;
import com.ssafy.coala.domain.problem.domain.Tag;
import com.ssafy.coala.domain.problem.dto.ProblemDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RequiredArgsConstructor
@RestController
@RequestMapping("/problem")
public class ProblemController {

    @Autowired
    ProblemService problemService;

    @Operation(summary = "최근 문제 리스트", description = "해당 유저가 최근 푼 문제 리스트를 가져온다.")
    @GetMapping("recent/{bojId}")
    public ResponseEntity<List<Problem>> getRecentProblem(@Parameter(description = "bojId", required = true, example = "col016")
                                                              @PathVariable String bojId){
        List<Problem> list = new ArrayList<>();
        for (int i=0; i<10; i++){
            list.add(new Problem());
        }
        System.out.println(bojId + 1);
        return ResponseEntity.ok((list));
    }

    @Operation(summary = "추천 문제 리스트", description = "해당 유저의 추천 푼 문제 리스트를 가져온다.")
    @GetMapping("curate/{bojId}")
    public ResponseEntity<List<Problem>> getCurateProblem(@Parameter(description = "bojId", required = true, example = "shiftpsh")
                                                              @PathVariable String bojId){
        List<Problem> list = new ArrayList<>();
        for (int i=0; i<10; i++){
            list.add(new Problem());
        }
        System.out.println(bojId + 2);
        return ResponseEntity.ok((list));
    }

    @Operation(summary = "푼 문제 리스트", description = "해당 유저가 푼 전체 리스트를 가져온다.")
    @GetMapping("problem/{bojId}")
    public ResponseEntity<List<Problem>> getUserProblem(@Parameter(description = "bojId", required = true, example = "col016")
                                                            @PathVariable String bojId){
        List<Problem> list = new ArrayList<>();
        for (int i=0; i<10; i++){
            list.add(new Problem());
        }
        System.out.println(bojId + 2);
        return ResponseEntity.ok((list));
    }

    @Operation(summary = "유저 문제 갱신", description = "유저가 푼 문제 리스트를 갱신하고 가져온다. 성공시 유저의 최근 푼 문제, 추천문제도 갱신한다")
    @PutMapping("{bojId}")
    public ResponseEntity<List<Problem>> updateUserProblem(@Parameter(description = "bojId", required = true, example = "col016")
                                                               @PathVariable String bojId){
        List<Problem> list = new ArrayList<>();
        for (int i=0; i<10; i++){
            list.add(new Problem());
        }
        System.out.println(bojId + 3);
        return ResponseEntity.ok((list));
    }

    @Operation(summary = "문제를 푼 유저 리스트", description = "문제를 문 유저 리스트를 시간순으로 가져온다.")
    @GetMapping("user/{problemId}")
    public ResponseEntity<List<Problem>> getProblemUser(@Parameter(description = "problemId", required = true, example = "1000")
                                                            @PathVariable int problemId){
        List<Problem> list = new ArrayList<>();
        for (int i=0; i<10; i++){
            list.add(new Problem());
        }
        return ResponseEntity.ok((list));
    }

    @Operation(summary = "모든 문제 리스트", description = "모든 문제에 대한 정보를 가져온다.")
    @GetMapping("")
    public ResponseEntity<List<Problem>> getProblemList(){
        List<Problem> list = new ArrayList<>();
        for (int i=0; i<10; i++){
            list.add(new Problem());
        }
        return ResponseEntity.ok((list));
    }

    @Operation(summary = "문제정보조회", description = "해당 문제 하나에 대한 정보만 조회한다.")
    @GetMapping("{problemId}")
    public ResponseEntity<Problem> getProblem(@Parameter(description = "problemId", required = true, example = "1000")
                                                  @PathVariable int problemId){
        return ResponseEntity.ok(new Problem());
    }

}
