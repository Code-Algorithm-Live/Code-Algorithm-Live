package com.ssafy.coala.domain.notice.controller;

import com.ssafy.coala.domain.notice.application.NoticeService;
import com.ssafy.coala.domain.notice.domain.Notices;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/notice")
public class NoticeController {
    @Autowired
    NoticeService noticeService;


    @Operation(summary = "알림 생성", description = "해당 유저의 알림 객체를 생성한다.")
    @PutMapping("/{id}")
    public ResponseEntity<Notices> newNotice(@Parameter(description = "memberId", required = true, example = "1") @PathVariable int id) {
        return ResponseEntity.ok(noticeService.createNotices(1));
    }

    @Operation(summary = "알림 리스트", description = "해당 유저의 알림 리스트를 가져온다.")
    @GetMapping("/{id}")
    public ResponseEntity<Notices> getNotice(@Parameter(description = "memberId", required = true, example = "1") @PathVariable int id) {
        return ResponseEntity.ok(noticeService.getNotices(1));
    }

    @Operation(summary = "알림 추가", description = "해당 유저의 알림을 추가한다.")
    @PutMapping("/{id}/add")
    public ResponseEntity<Notices> patchNotice(@Parameter(description = "memberId", required = true, example = "1") @PathVariable int id,
                                               @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "notice", required = true) @RequestBody String Body) {
        return ResponseEntity.ok(noticeService.addNotices(1));
    }

    @Operation(summary = "알림 제거", description = "해당 유저의 알림을 제거한다.")
    @DeleteMapping("/{id}")
    public ResponseEntity<Notices> delNotice(@Parameter(description = "notice", required = true, example = "reqNotice") @PathVariable int id,
                                             @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "notice", required = true) @RequestBody String Body) {
        return ResponseEntity.ok(noticeService.getNotices(1));
    }
}
