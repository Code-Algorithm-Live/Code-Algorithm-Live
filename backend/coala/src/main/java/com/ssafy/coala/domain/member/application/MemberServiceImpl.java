package com.ssafy.coala.domain.member.application;

import com.ssafy.coala.domain.member.dao.MemberRepository;
import com.ssafy.coala.domain.member.domain.Member;
import com.ssafy.coala.domain.member.dto.CustomUserDetails;

import com.ssafy.coala.domain.member.domain.MemberProfile;
import com.ssafy.coala.domain.member.dao.MemberProfileRepository;
import com.ssafy.coala.domain.member.dto.MemberDto;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class MemberServiceImpl implements MemberService {


    private final MemberProfileRepository memberProfileRepository;
    private final MemberRepository memberRepository;
    private final RedisTemplate<String, String> redisStringTemplate;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;


    public MemberServiceImpl(MemberProfileRepository memberProfileRepository, MemberRepository memberRepository, RedisTemplate<String, String> redisStringTemplate, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.memberProfileRepository = memberProfileRepository;
        this.memberRepository = memberRepository;
        this.redisStringTemplate = redisStringTemplate;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }


    @Override
    public boolean check(MemberDto member) {

        return memberProfileRepository.existsByEmail(member.getEmail());
    }

    @Override
    public void signUp(MemberDto memberDto) {
        System.out.println(memberDto);
        MemberProfile memberProfile = MemberProfile.builder()
                .nickname(memberDto.getNickname())
                .kakaoname(memberDto.getKakaoname())
                .email(memberDto.getEmail())
                .solvedId(memberDto.getSolvedId())
                .imageUrl(memberDto.getImage())
                .build();

        memberProfileRepository.save(memberProfile);
        MemberProfile tmpmember = memberProfileRepository.findBySolvedId(memberDto.getSolvedId());

        System.out.println("UUID : " + tmpmember.getId());
        Member member = Member.builder()
                .id(tmpmember.getId())
                .nickname(tmpmember.getNickname())
                .email(tmpmember.getEmail())
                .solvedId(tmpmember.getSolvedId())
                .password(bCryptPasswordEncoder.encode(tmpmember.getEmail()))
                .imageUrl(tmpmember.getImageUrl())
                .build();
        memberRepository.save(member);
    }

    @Override
    public MemberProfile getMemberProfile(UUID uuid) {
        return memberProfileRepository.findById(uuid);
    }

    @Override
    public Member getMember(UUID uuid) {
        return memberRepository.findById(uuid);
    }

    @Override
    public boolean dupCheck(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }

    @Override
    public void logout() {
        //Token에서 로그인한 사용자 정보 get해 로그아웃 처리
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = customUserDetails.getMember();
        //
        if (redisStringTemplate.opsForValue().get("JWT_TOKEN:" + member.getEmail()) != null) {
            redisStringTemplate.delete("JWT_TOKEN:" + member.getEmail()); //Token 삭제
            System.out.println("로그아웃 성공");
        }
    }

    @Override
    public Member getMemberByNickname(String name) {
        return memberRepository.findByNickname(name);
    }

    @Override
    public List<Member> getMemberAllList() {
        List<Member> list = memberRepository.findAll();
        return list;
    }
}
