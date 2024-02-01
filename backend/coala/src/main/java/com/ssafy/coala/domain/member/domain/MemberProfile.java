package com.ssafy.coala.domain.member.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;
//import org.springframework.security.crypto.password.PasswordEncoder;

@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
@Table(name = "member_profile")
@Getter
public class MemberProfile {

    @Id @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name="uuid2", strategy = "uuid2")
    @Column(name = "id", columnDefinition = "BINARY(16)")
    private UUID id;

    private String solvedId;

    private String email;
    private String kakaoname;
    private String nickname;
    private String imageUrl;


    private String socialId;

//    private String refreshToken;
//
//
//    public void updateRefreshToken(String updateRefreshToken) {
//        this.refreshToken = updateRefreshToken;
//    }


}
