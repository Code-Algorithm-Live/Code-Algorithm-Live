package com.ssafy.coala.domain.help.controller;


import java.util.Map;
import java.util.UUID;

import com.ssafy.coala.domain.member.domain.Member;
import com.ssafy.coala.domain.help.service.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/redis")
@RequiredArgsConstructor
public class RedisTestController {

    private final RedisService redisService;

    @GetMapping("/{memberId}")
    public ResponseEntity<?> getMemberInfo(@PathVariable("memberId") String id) {
        return ResponseEntity.ok(redisService.getMemberInfo(id));
    }

    @PostMapping("")
    public ResponseEntity<?> joinMember(@RequestBody Map<String, String> memberInfo) {
        Member member = new Member();
        member.setEmail(memberInfo.get("email"));
        redisService.joinMember(member);
        return ResponseEntity.ok("가입 완료");
    }

    @PutMapping("")
    public ResponseEntity<?> updateMember(@RequestBody Map<String, String> memberInfo) {
        System.out.println(memberInfo);
        Member member = new Member();
        member.setId(UUID.fromString((memberInfo.get("id"))));
        member.setEmail(memberInfo.get("email"));
        redisService.updateMember(member, member.getSolvedId());
        return ResponseEntity.ok("수정 완료");
    }

    @DeleteMapping("/{memberId}")
    public ResponseEntity<?> deleteMember(@PathVariable("memberId") String id) {
        redisService.removeMember(id);
        return ResponseEntity.ok("삭제 완료");
    }

//    @PostMapping("/queue")
//    public ResponseEntity<?> pushQueue(@RequestBody Map<String, String> memberInfo) {
//        Member member = new Member();
//        member.setName(memberInfo.get("name"));
//        redisService.addUser(member);
//        return ResponseEntity.ok("queue 푸쉬 완료");
//    }

    @GetMapping("/queue")
    public ResponseEntity<?> getQueue() {
        return ResponseEntity.ok(redisService.getAllUsers());
    }

}
