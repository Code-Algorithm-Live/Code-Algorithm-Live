package com.ssafy.coala.domain.member.jwt;

import com.ssafy.coala.domain.member.application.MemberService;
import com.ssafy.coala.domain.member.controller.MemberController;
import com.ssafy.coala.domain.member.dao.MemberProfileRepository;
import com.ssafy.coala.domain.member.dao.MemberRepository;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.UUID;

@Component
public class JWTUtil {

    private SecretKey secretKey;
    @Autowired
    private MemberProfileRepository memberProfileRepository;
    public JWTUtil(@Value("${spring.jwt.secretKey}")String secret) {


        this.secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
    }

    //토큰에서 payload 값 꺼내는 메소드
    public String getNickname(String token) {

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("nickname", String.class);
    }


    public String getEmail(String token) {

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("email", String.class);
    }


    public Boolean isExpired(String token) {

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration().before(new Date());
    }

    public String createJwt(String nickname, String email , Long expiredMs) {

        return Jwts.builder()
                .claim("nickname", nickname)
                .claim("email",email)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiredMs))
                .signWith(secretKey)
                .compact();
    }

    public String createRefreshJwt(Long expiredMs) {

        return Jwts.builder()
                .subject("RefreshToken")
                .expiration(new Date(System.currentTimeMillis() + expiredMs))
                .signWith(secretKey)
                .compact();
    }

    public void updateByJwt(String token){
        memberProfileRepository.updateLastRequestByNickname(getNickname(token));
    }
}
