package com.ssafy.coala.test.service;

import com.ssafy.coala.test.dto.JoinDto;
import com.ssafy.coala.domain.member.dao.MemberRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JoinService {


    private final MemberRepository memberRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public JoinService(MemberRepository memberRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.memberRepository = memberRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }


    public void joinProcess(JoinDto joinDto){
        String username = joinDto.getUsername();
        String password = joinDto.getPassword();

        Boolean isExist = memberRepository.existsByNickname(username);

        if(isExist){

            return;
        }

//        UserEntity data = new UserEntity();

//        data.setUsername(username);
//        data.setPassword(bCryptPasswordEncoder.encode(password));
//        data.setRole("ROLE_ADMIN");

//        userRepository.save(data);

    }
}
