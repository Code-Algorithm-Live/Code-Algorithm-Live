package com.ssafy.coala.test.service;

import com.ssafy.coala.test.dto.CustomUserDetails;
import com.ssafy.coala.test.entity.UserEntity;
import com.ssafy.coala.test.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<UserEntity> userData = userRepository.findByNickname(username);

        return userData.map(CustomUserDetails::new).orElse(null);

    }
}
