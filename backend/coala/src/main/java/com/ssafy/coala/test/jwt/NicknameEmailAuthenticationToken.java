package com.ssafy.coala.test.jwt;

import com.ssafy.coala.test.dto.CustomUserDetails;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

public class NicknameEmailAuthenticationToken extends UsernamePasswordAuthenticationToken {

    private Long id;
    private String email;



    public NicknameEmailAuthenticationToken(String email, Long id, Object credentials) {
        super(null, credentials);
        this.id = id;
        this.email = email;
    }



    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }
}
