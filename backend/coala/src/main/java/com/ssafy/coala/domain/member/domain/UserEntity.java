package com.ssafy.coala.domain.member.domain;

import io.swagger.v3.oas.annotations.info.Contact;
import jakarta.persistence.*;
import lombok.*;
//import org.springframework.security.crypto.password.PasswordEncoder;

@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
@Table(name = "users")
@Getter
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    private String email;
    private String nickname;
    private String imageUrl;
    private int age;

    private String role;

    private String socialId;

    private String refreshToken;

    // 비밀번호 암호화 메소드
//    public void passwordEncode(PasswordEncoder passwordEncoder) {
//        this.password = passwordEncoder.encode(this.password);
//    }

    public void updateRefreshToken(String updateRefreshToken) {
        this.refreshToken = updateRefreshToken;
    }


}
