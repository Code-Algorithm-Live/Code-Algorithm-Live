package com.ssafy.coala.domain.member.application;

import com.ssafy.coala.domain.member.dao.NoticeRepository;
import com.ssafy.coala.domain.member.domain.Notices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NoticeServiceImpl implements NoticeService{
    @Autowired
    NoticeRepository noticeRepository;

    @Override
    public Notices createNotices(int id) {
        return noticeRepository.save(new Notices(id));
    }
    @Override
    public Notices getNotices(int id) {
        return noticeRepository.findById(id).get();
    }



    @Override
    public Notices addNotices(int id) {
        Notices notices = getNotices(id);
        notices.add(1, "1", "1");
        return noticeRepository.save(notices);
    }
}
