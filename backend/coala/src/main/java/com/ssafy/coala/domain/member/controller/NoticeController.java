package com.ssafy.coala.domain.member.controller;

import com.ssafy.coala.domain.member.application.NoticeService;
import com.ssafy.coala.domain.member.domain.Notices;
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


    @Operation(summary = "notice", description = "notice api")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })


    @PutMapping("/{id}")
    public ResponseEntity<Notices> newNotice(@Parameter(description = "알림", required = true, example = "reqNotice") @PathVariable int id) {
        return ResponseEntity.ok(noticeService.createNotices(1));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notices> getNotice(@Parameter(description = "알림", required = true, example = "reqNotice") @PathVariable int id) {
        return ResponseEntity.ok(noticeService.getNotices(1));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Notices> patchNotice(@Parameter(description = "알림", required = true, example = "reqNotice") @PathVariable int id) {
        return ResponseEntity.ok(noticeService.addNotices(1));
    }

}
