package com.ssafy.coala.test.dto;

import com.ssafy.coala.domain.member.domain.MemberProfile;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

public class CustomUserDetails implements UserDetails {

    private final MemberProfile memberProfile;

    public CustomUserDetails(MemberProfile memberProfile) {
        this.memberProfile = memberProfile;
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
        return null;
    }

    @Override
    public String getUsername() {
        return memberProfile.getNickname();
    }

    public String getEmail(){return memberProfile.getEmail();}

//    public Long getId(){return memberProfile.getId();}

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
