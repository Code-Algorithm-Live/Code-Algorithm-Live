package com.ssafy.coala.domain.member.jwt;

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
