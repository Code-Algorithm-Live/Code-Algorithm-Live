package com.ssafy.coala.domain.help.dao;

import com.ssafy.coala.domain.member.domain.Member;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

// Redis 기본 CRUD 예제 코드, 프로젝트에서 사용되고 있지 않음
@Repository
@RequiredArgsConstructor
public class RedisRepositoryImpl implements RedisRepository {

    private final EntityManager em;

    @Override
    public Member save(Member member) {
        if (member.getId() == null) {
            em.persist(member);
        } else {
            Member findMember = em.find(Member.class, member.getId());
//            findMember.setEmail(member.getEmail());
        }

        return member;
    }


    @Override
    public Member findOne(String solvedId) {
        return em.find(Member.class, solvedId);
    }

    @Override
    public void remove(Member member) {
        em.remove(member);
    }
}
