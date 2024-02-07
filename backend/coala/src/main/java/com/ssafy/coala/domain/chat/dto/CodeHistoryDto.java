package com.ssafy.coala.domain.chat.dto;

import com.ssafy.coala.domain.chat.domain.CodeHistory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CodeHistoryDto {
    private int idx;
    private String pre;
    private String next;
    private LocalDateTime time;

    public CodeHistoryDto(CodeHistory codeHistory){
        idx = codeHistory.getIdx();
        pre = codeHistory.getPre();
        next = codeHistory.getNext();
        time = codeHistory.getTime();
    }

    public CodeHistory toCodeHistory(UUID roomUuid){
        return new CodeHistory(null, roomUuid, idx, pre, next, time);
    }
}