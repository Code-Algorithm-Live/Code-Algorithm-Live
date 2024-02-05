package com.ssafy.coala.domain.help.service;

import com.ssafy.coala.domain.help.dto.WaitDto;

public interface MatchingService {
    public void notifyMatching(WaitDto waitDto);
    public void sendHelp(WaitDto waitDto);
}
