package com.ssafy.coala.domain.member.application;

import com.ssafy.coala.domain.member.dao.MemberProfileRepository;
import com.ssafy.coala.domain.member.dao.MemberRepository;
import com.ssafy.coala.domain.member.domain.Member;
import com.ssafy.coala.domain.member.domain.MemberProfile;
import com.ssafy.coala.domain.member.dto.CustomUserDetails;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    private final MemberProfileRepository memberProfileRepository;

    public CustomUserDetailsService(MemberRepository memberRepository, MemberProfileRepository memberProfileRepository) {
        this.memberRepository = memberRepository;
        this.memberProfileRepository = memberProfileRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MemberProfile memberProfile = memberProfileRepository.findByKakaoname(username);
        Member userData = memberRepository.findByNickname(memberProfile.getNickname());
        System.out.println("Member Check : " + userData);
        if (userData != null) {

            //UserDetails에 담아서 return하면 AutneticationManager가 검증 함
            return new CustomUserDetails(userData);
        }

        return null;

    }
}
