package com.ssafy.coala.domain.help.repository;

import com.ssafy.coala.domain.member.domain.Member;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

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
            findMember.setName(member.getName());
        }

        return member;
    }


    @Override
    public Member findOne(Long memberId) {
        return em.find(Member.class, memberId);
    }

    @Override
    public void remove(Member member) {
        em.remove(member);
    }
}
