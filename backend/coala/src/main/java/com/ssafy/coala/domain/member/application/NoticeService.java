package com.ssafy.coala.domain.member.application;

import com.ssafy.coala.domain.member.domain.Notices;
import org.springframework.stereotype.Service;

@Service
public interface NoticeService {
    public Notices getNotices(int id);
    public Notices createNotices(int id);
    public Notices addNotices(int id);

}
