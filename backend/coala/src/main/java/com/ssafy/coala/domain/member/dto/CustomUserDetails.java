package com.ssafy.coala.domain.member.dto;

import com.ssafy.coala.domain.member.domain.Member;
import com.ssafy.coala.domain.member.domain.MemberProfile;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

public class CustomUserDetails implements UserDetails {

    private final Member member;

    public CustomUserDetails(Member member) {
        this.member = member;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Collection<GrantedAuthority> collection = new ArrayList<>();

        collection.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
//                return memberProfile.getRole();
                return null;
            }
        });

        return collection;
    }

    @Override
    public String getPassword() {
        return member.getEmail();
    }

    @Override
    public String getUsername() {
        return member.getNickname();
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
