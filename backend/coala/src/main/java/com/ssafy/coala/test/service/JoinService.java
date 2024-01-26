package com.ssafy.coala.test.service;

import com.ssafy.coala.test.dto.JoinDto;
import com.ssafy.coala.domain.member.dao.MemberProfileRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JoinService {


    private final MemberProfileRepository memberProfileRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public JoinService(MemberProfileRepository memberProfileRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.memberProfileRepository = memberProfileRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }


    public void joinProcess(JoinDto joinDto){
        String username = joinDto.getUsername();
        String password = joinDto.getPassword();

        Boolean isExist = memberProfileRepository.existsByNickname(username);

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
