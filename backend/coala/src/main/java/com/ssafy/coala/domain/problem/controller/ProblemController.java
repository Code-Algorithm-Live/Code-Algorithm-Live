package com.ssafy.coala.domain.problem.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.coala.domain.member.domain.Member;
import com.ssafy.coala.domain.problem.application.ProblemService;
import com.ssafy.coala.domain.problem.domain.CurateInfo;
import com.ssafy.coala.domain.problem.domain.Problem;
import com.ssafy.coala.domain.problem.dto.ProblemDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.security.SecureRandom;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/problem")
public class ProblemController {
    @Autowired
    ProblemService problemService;

    @Operation(summary = "문제 추천", description = "해당 유저의 정보를 기반으로 문제를 추천한다." +
            " 5분에 한번 호출가능. 약 5초정도 대기 필요")
    @GetMapping("curate/{solvedId}")
    public ResponseEntity<CurateInfo> udpateMemberProblem(@PathVariable String solvedId){

        CurateInfo result = problemService.getCurateProblem(solvedId);

        return ResponseEntity.ok(result);
    }

    @Operation(summary = "문제 크롤링", description = "해당 문제에 대한 백준 사이트 html을 크롤링한다. !!호출횟수 줄일 것!!")
    @GetMapping("crawl/{problemId}")
    public ResponseEntity<String> crawlingHtml(@PathVariable String problemId){
        String URL = "https://www.acmicpc.net/problem/"+problemId;

        Document doc = null;
        try {
            doc = Jsoup.connect(URL).get();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok(doc.toString());
    }

    @Operation(summary = "푼 문제 리스트", description = "해당 유저가 푼 전체 문제번호리스트를 가져온다.")
    @GetMapping("problem/{solvedId}")
    public ResponseEntity<List<Integer>> getProblemByMember(@Parameter(description = "solvedId", required = true, example = "col016")
                                                            @PathVariable String solvedId){
        return ResponseEntity.ok((problemService.getProblemByMember(solvedId)));
    }

//    @Operation(summary = "문제를 푼 유저 리스트", description = "문제를 푼 유저 리스트를 시간순으로 가져온다.")
//    @GetMapping("member/{problemId}")
//    public ResponseEntity<List<String>> getMemberByProblem(@Parameter(description = "problemId", required = true, example = "1000")
//                                                            @PathVariable int problemId){
//        return ResponseEntity.ok((problemService.getRecentMemberProblem(problemId)));
//    }

    @Operation(summary = "모든 문제 리스트", description = "모든 문제에 대한 정보를 가져온다.")
    @GetMapping("")
    public ResponseEntity<List<Problem>> getProblemList(){
        List<Problem> list = new ArrayList<>();
        for (int i=0; i<10; i++){
            list.add(new Problem());
        }
        return ResponseEntity.ok((list));
    }


    @Operation(summary = "문제정보조회", description = "해당 문제 하나에 대한 정보만 조회한다.(더미)")
    @GetMapping("{problemId}")
    public ResponseEntity<String> getDummyProblem(@Parameter(description = "problemId", required = true, example = "1000")
                                                  @PathVariable int problemId){
        return ResponseEntity.ok("{\n" +
                "    \"id\": 1000,\n" +
                "    \"title\": \"A+B\",\n" +
                "    \"accepted_user_count\": 276511,\n" +
                "    \"level\": 1,\n" +
                "    \"give_no_rating\": false,\n" +
                "    \"average_tries\": 2.5356,\n" +
                "    \"description\": \"두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.\",\n" +
                "    \"tags\": [\n" +
                "        \"구현\",\n" +
                "        \"사칙연산\",\n" +
                "        \"수학\"\n" +
                "    ]\n" +
                "}");
    }
//    @Operation(summary = "문제정보조회", description = "해당 문제 하나에 대한 정보만 조회한다.")
//    @GetMapping("{problemId}")
    public ResponseEntity<ProblemDto> getProblem(@Parameter(description = "problemId", required = true, example = "1000")
                                                  @PathVariable int problemId){
        Problem problem = problemService.getProblem(problemId);
        if (problem!=null){
            if (problem.getDescription()==null){
                try {
                    String URL = "https://www.acmicpc.net/problem/"+problemId;
                    Document doc = Jsoup.connect(URL).get();
                    String desc = doc.select("#problem_description").text();
                    if (desc.length()>100) desc = desc.substring(0,100);
                    problemService.updateDescriptionById(problemId, desc);
                    problem.setDescription(desc);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            return ResponseEntity.ok(new ProblemDto(problem));
        }

        return ResponseEntity.ok(null);
    }



    private static String generateRandomString(int length) {
        SecureRandom secureRandom = new SecureRandom();
        byte[] randomBytes = new byte[length];
        secureRandom.nextBytes(randomBytes);

        return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
    }



//    private RecentProblem updateRecentProblem(String bojId){ //크롤링한 정보로 업데이트 요청한다.
////        doc.select(".problem_title")
//        RecentProblem result = new RecentProblem();
////        https://www.acmicpc.net/status?problem_id=&user_id=col016&language_id=-1&result_id=4
//        String URL = "https://www.acmicpc.net/status?problem_id=&user_id="+bojId+"&language_id=-1&result_id=4";
//        try {
//            Document doc = Jsoup.connect(URL).get();
//            String[] problem = doc.select(".problem_title").text().split(" ");
//            List<Integer> list = new ArrayList<>();//중복가능한 리스트, 순서를 유지하기 위해서 set는 쓰지 않는다.
//
//            for (String p:problem){//5개가 될때까지 센다.
//                int pid = Integer.parseInt(p);
//                if (!list.contains(pid)){
//                    list.add(pid);
//                    if (list.size()==5) break;;
//                }
//            }
//
//
//
//
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
//
//        return result;
//    }

}
