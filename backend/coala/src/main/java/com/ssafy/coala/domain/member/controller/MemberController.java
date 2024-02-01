package com.ssafy.coala.domain.member.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.coala.domain.member.application.MemberService;
import com.ssafy.coala.domain.member.domain.Member;
import com.ssafy.coala.domain.member.domain.MemberProfile;
import com.ssafy.coala.domain.member.dto.CustomUserDetails;
import com.ssafy.coala.domain.member.dto.MemberDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
//import org.jsoup.Jsoup;
//import org.jsoup.nodes.Document;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    @Operation(summary = "member", description = "member api")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })

    @PostMapping("/login")
    public ResponseEntity<?> logincheck(@RequestBody MemberDto memberDto){
        System.out.println(memberDto);
        boolean isMember = memberService.check(memberDto);
        System.out.println(isMember);
        if(isMember){
            return new ResponseEntity<Boolean>(isMember,HttpStatus.FOUND);
        }
        return new ResponseEntity<Boolean>(isMember,HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(){
        memberService.logout();
        return ResponseEntity.ok().build();
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody MemberDto memberDto){
        memberService.signUp(memberDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/profile/{uuid}")
    public ResponseEntity<?> getMemberProfile(@PathVariable UUID uuid){
        MemberProfile memberProfile = memberService.getMemberProfile(uuid);
        return new ResponseEntity<MemberProfile>(memberProfile,HttpStatus.OK);
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<?> getMember(@PathVariable UUID uuid){
        Member member = memberService.getMember(uuid);
        return new ResponseEntity<Member>(member,HttpStatus.OK);
    }

    @GetMapping("/info")
    public ResponseEntity<?> info(){
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        Member member = memberService.getMemberByNickname(name);
        return new ResponseEntity<Member>(member,HttpStatus.OK);
    }

    @GetMapping("/dupcheck/{nickname}")
    public ResponseEntity<?> dupcheck(@PathVariable String nickname){
        boolean isDup = memberService.dupCheck(nickname);
        return new ResponseEntity<Boolean>(isDup,HttpStatus.OK);
    }

    @Operation(summary = "유저 정보 조회", description = "유저의 자기소개 데이터를 보여준다.")
    @GetMapping("auth/{solvedId}")
    private static ResponseEntity<String> generateAuthStr(@PathVariable String solvedId){
        // 응답 데이터 읽기
        try {
            String apiUrl = "https://solved.ac/api/v3/user/show?handle="+solvedId;
            HttpClient client = HttpClient.newHttpClient();
            // HttpRequest 객체 생성
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl.toString()))
                    .build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            ObjectMapper mapper = new ObjectMapper();
            Map map = mapper.readValue(response.body(), Map.class);//json 파싱
            System.out.println("map.get(\"bio\")");
            return ResponseEntity.ok((String) map.get("bio"));
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

//    @Operation(summary = "백준 연동 시도", description = "해당 id에 대한 solved 자기소개 프로필 확인후 문자연 일치하면 id반환")
//    @GetMapping("/solved/{bojId}")
//    public ResponseEntity<String> solved(@Parameter(description = "solved연동", required = true, example = "col016") @PathVariable String bojId){
//        String apiUrl = "https://solved.ac/api/v3/user/show?handle="+bojId;
//        // HttpClient 객체 생성
//        HttpClient client = HttpClient.newHttpClient();
//
//        // HttpRequest 객체 생성
//        HttpRequest request = HttpRequest.newBuilder()
//                .uri(URI.create(apiUrl))
//                .build();
//        String result = "";
//        // 응답 데이터 읽기
//        try {
//            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
//            // 응답 코드 확인
//            int statusCode = response.statusCode();
////            System.out.println("Status Code: " + statusCode);
//            List<Problem> input = new ArrayList<>();
//
//            if (statusCode == 200) {//solved.ac에서 계정정보 가져옴
//                ObjectMapper mapper = new ObjectMapper();
//                Map map = mapper.readValue(response.body(), Map.class);
//
//                if (((String)map.get("bio")).equals("")){
//                    result = (String) map.get("handle");
//                    System.out.println(getProblemList(bojId));
//                }
//            }
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        } catch (InterruptedException e) {
//            throw new RuntimeException(e);
//        }
//
//
//        return ResponseEntity.ok(result);
//    }

//    private List<Integer> getProblemList(String bojId) throws IOException {
//        String URL = "https://www.acmicpc.net/user/"+bojId;
//        Document doc = Jsoup.connect(URL).get();
////        System.out.println(doc);
//
////        Element element = doc.select(".list_problem_id").get(0);
//        String[] problems = doc.select(".problem-list").text().split(" ");
//        List<Integer> result = new ArrayList<>();
//
//        for (String p : problems){
//            if (p.length()>0){
//                result.add(Integer.parseInt(p));
//            }
//        }
//        return result;
//    }
}
