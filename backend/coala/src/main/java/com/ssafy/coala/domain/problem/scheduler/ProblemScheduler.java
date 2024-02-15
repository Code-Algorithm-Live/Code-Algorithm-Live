package com.ssafy.coala.domain.problem.scheduler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.coala.domain.problem.application.ProblemService;
import com.ssafy.coala.domain.problem.domain.Problem;
import com.ssafy.coala.domain.problem.domain.ProblemLanguage;
import com.ssafy.coala.domain.problem.domain.Tag;
import jakarta.annotation.PostConstruct;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ScheduledFuture;

@Component
public class ProblemScheduler {
    @Autowired
    ProblemService problemService;
    //    1초마다 실행
//    @Scheduled(fixedRate = 1000)
//    public void test(){
//        System.out.println(1);
//    }
//    private ScheduledFuture<?> scheduledFuture;

    //최대로 저장할 문제 idx
    int maxId = 0;
    //다음 저장할 문제 idx
    int curId = 0;

    @PostConstruct
    @Scheduled(cron = "0 0 0 * * *")
    public void setMaxId() throws IOException{
        String URL = "https://www.acmicpc.net/problemset?sort=no_desc";
        Document doc = Jsoup.connect(URL).get();
//        System.out.println(doc);
//        Element element = doc.select(".list_problem_id").get(0);
        maxId = Integer.parseInt(doc.select(".list_problem_id").get(0).text());
        System.out.println("maxId:"+maxId);
    }

    //solved.ac api의 호출제한->15분당 256번
    //15분당10번 문제데이터를 solved.ac api에서 가져온다.
    //5분마다6000개의 문제를 가져오고, 15분동안 18000개의 문제를 얻는다. 30분동안 모든문제데이터를 입력한다.
    //2분정도 걸린다...
    @Scheduled(fixedRate = 300000)
    public void saveProblem() {
        long start = System.currentTimeMillis();
        System.out.println("save start...");
        try {
            // API 호출 주소
            if (curId == 0){ //초깃값이면 db에서 가져온다.
                curId = problemService.curId();
            }
            if (curId>=maxId) {
                curId = 999;
            }


            int curIter = Math.min(60,(maxId-curId)/100+1);

            List<Problem> input = new ArrayList<>();

            for (int iter=0; iter<curIter; iter++) {

                StringBuilder apiUrl = new StringBuilder("https://solved.ac/api/v3/problem/lookup?problemIds=");

                apiUrl.append(++curId);

                for (int i = 1; i < 100 && maxId > curId; i++) {
                    apiUrl.append("%2C").append(++curId);
                }
//            System.out.println(apiUrl);
                // HttpClient 객체 생성
                HttpClient client = HttpClient.newHttpClient();

                // HttpRequest 객체 생성
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(apiUrl.toString()))
                        .build();

                // 응답 데이터 읽기
                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

                // 응답 코드 확인
                int statusCode = response.statusCode();
//            System.out.println("Status Code: " + statusCode);

                if (statusCode == 200) {//문제 리스트 solved.ac에서 가져옴
                    try {
                        ObjectMapper mapper = new ObjectMapper();
                        List list = mapper.readValue(response.body(), List.class);//json 파싱

                        for (Object o : list) {//문제 리스트 순회
                            Map map = (Map) o;
                            List tags = (List) map.get("tags"); //tags 순회 변수
                            List titles = (List) map.get("titles");

                            Problem problem = new Problem((Integer) map.get("problemId"), (String) map.get("titleKo"),
                                    (int) map.get("acceptedUserCount"), (int) map.get("level"),
                                    (boolean) map.get("givesNoRating"), ((Number) map.get("averageTries")).floatValue(), null);//tags가 없는 problem 객체 생성

                            List<Tag> tagList = new ArrayList<>();
                            List<ProblemLanguage> problemLanguages = new ArrayList<>();
                            for (Object tag : tags) {//tags 순회
                                tagList.add(new Tag(problem,
                                        (String) ((Map<?, ?>) ((List<?>) ((Map<?, ?>) tag).get("displayNames")).get(0)).get("name")));
                            }

                            for (Object title : titles){
                                problemLanguages.add(new ProblemLanguage(problem,
                                        (String) ((Map<?, ?>)title).get("language"), (String) ((Map<?, ?>)title).get("title")));
                            }

                            problem.setTags(tagList);//tags 객체 추가
                            problem.setLanguages(problemLanguages);
                            input.add(problem); //query 보낼 리스트에 추가
                        }

//                    List<ProblemDto> result = new ArrayList<>();
//                    for (int i=0; i<input.size(); i++){
//                        result.add(new ProblemDto(input.get(i)));
//                    }// dto로 변환
//
//                    System.out.println(result);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
            problemService.insertProblem(input);
            System.out.println("Problem saved. " + curId + ":" + maxId+", time: "+(System.currentTimeMillis()-start));

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}