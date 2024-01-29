package com.ssafy.coala.domain.problem.controller;

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
import java.security.SecureRandom;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/problem")
public class ProblemController {

    @Autowired
    ProblemService problemService;

    public List<Integer> getProblem(String solvedId){
        List<Integer> result = new ArrayList<>();
//        String solvedId = "col016";
        String URL = "https://www.acmicpc.net/user/"+solvedId;
        try {
            Document doc = Jsoup.connect(URL).get();
            String[] id_arr = doc.select(".problem-list").get(0).text().split(" ");

            for (String id : id_arr){
                if (!id.isEmpty()){
                    result.add(Integer.parseInt(id));
                }
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return result;
    }
    public List<String[]> getRecentProblem(String solvedId) {
        List<String[]> result = new ArrayList<>();
//        String solvedId = "col016";
        try {
            String URL = "https://www.acmicpc.net/status?problem_id=&user_id="
                    + solvedId + "&language_id=-1&result_id=4";

            Document doc = Jsoup.connect(URL).get();

            Elements idElem = doc.select(".problem_title");
            Elements timeElem = doc.select(".real-time-update");

            for (int i = 0; i < idElem.size(); i++) {
                String problemId = idElem.get(i).text();

                boolean flag = false;
                for (String[] elem : result) {
                    if (elem[0].equals(problemId)) {
                        flag = true;
                        break;
                    }
                }

                if (flag) continue;
                result.add(new String[]{problemId, timeElem.get(i).attr("title")});
            }
        } catch(IOException e){
            throw new RuntimeException(e);
        }
        return result;
    }

    @GetMapping("recent/{solvedId}")
    public ResponseEntity<CurateInfo> udpateMemberProblem(@PathVariable String solvedId){

        List<String[]> recentProblem = getRecentProblem(solvedId);
        List<Integer> problem = getProblem(solvedId);

        CurateInfo result = problemService.getCurateProblem(problem, recentProblem, solvedId);

        return ResponseEntity.ok(result);
    }

//    @Operation(summary = "최근 문제 리스트", description = "해당 유저가 최근 푼 문제 리스트를 가져온다.")
//    @GetMapping("recent/{solvedId}")
//    public ResponseEntity<List<Problem>> getRecentProblem(@Parameter(description = "solvedId", required = true, example = "col016")
//                                                              @PathVariable String solvedId){
//        List<Problem> list = new ArrayList<>();
//        for (int i=0; i<10; i++){
//            list.add(new Problem());
//        }
//        System.out.println(solvedId + 1);
//        return ResponseEntity.ok((list));
//    }

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
        Optional<Problem> option = problemService.getProblem(problemId);
        if (option.isPresent()){
            Problem problem = option.get();
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

        return ResponseEntity.ok(new ProblemDto());
    }

    @GetMapping("auth/{solvedId}")
    private static ResponseEntity<String> generateAuthStr(@PathVariable String solvedId){
        String Auth = generateRandomString(12);

        return ResponseEntity.ok(Auth);
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
