package com.ssafy.coala.test.service;


import com.ssafy.coala.test.dto.UserSignUpDto;
import com.ssafy.coala.domain.member.domain.MemberProfile;
import com.ssafy.coala.domain.member.dao.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public void signUp(UserSignUpDto userSignUpDto) throws Exception {
        if (memberRepository.findByEmail(userSignUpDto.getEmail()).isPresent()) {
            throw new Exception("이미 존재하는 이메일입니다.");
        }
        if (memberRepository.findByNickname(userSignUpDto.getNickname()).isPresent()) {
            throw new Exception("이미 존재하는 닉네임입니다.");
        }
        log.info("[UserService signUp userSignUpDto : {}]", userSignUpDto);

        MemberProfile user = MemberProfile.builder()
                .email(userSignUpDto.getEmail())
//                .password(userSignUpDto.getPassword())
                .nickname(userSignUpDto.getNickname())
                .build();

//        user.passwordEncode(passwordEncoder);
        memberRepository.save(user);
    }
}
