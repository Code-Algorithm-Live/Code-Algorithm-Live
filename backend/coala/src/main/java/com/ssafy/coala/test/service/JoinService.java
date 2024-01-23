package com.ssafy.coala.test.service;

import com.ssafy.coala.test.dto.JoinDto;
import com.ssafy.coala.domain.member.dao.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JoinService {


    private final UserRepository userRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public JoinService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }


    public void joinProcess(JoinDto joinDto){
        String username = joinDto.getUsername();
        String password = joinDto.getPassword();

        Boolean isExist = userRepository.existsByNickname(username);

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
