package com.ssafy.coala.test.service;


import com.ssafy.coala.test.dto.CustomUserDetails;
import com.ssafy.coala.test.entity.UserEntity;
import com.ssafy.coala.test.jwt.JWTUtil;
import com.ssafy.coala.test.jwt.NicknameEmailAuthenticationToken;
import com.ssafy.coala.test.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Getter
@Slf4j
public class JwtService {
//    @Value("${jwt.secretKey}")
//    private String secretKey;

    @Value("${jwt.access.expiration}")
    private Long accessTokenExpirationPeriod;

    @Value("${jwt.refresh.expiration}")
    private Long refreshTokenExpirationPeriod;

    @Value("${jwt.access.header}")
    private String accessHeader;

    @Value("${jwt.refresh.header}")
    private String refreshHeader;

    private final JWTUtil jwtUtil;

    private static final String ACCESS_TOKEN_SUBJECT = "AccessToken";
    private static final String REFRESH_TOKEN_SUBJECT = "RefreshToken";
    private static final String EMAIL_CLAIM = "email";
    private static final String BEARER = "Bearer ";

    private final UserRepository userRepository;

    public String createAccessToken(Long id, String email) {
        Date now = new Date();
        String token = jwtUtil.createJwt(id, email, null, Duration.ofMinutes(30).toMillis());
        return token;
    }

    public String createRefreshToken() {
        Date now = new Date();
        String token = jwtUtil.createRefreshJwt(refreshTokenExpirationPeriod);
        return token;
    }

    public void sendAccessToken(HttpServletResponse response, String accessToken) {
        response.setStatus(HttpServletResponse.SC_OK);
        response.setHeader(accessHeader, accessToken);
        log.info("[JwtService 재발급 Access Token : {}]", accessToken);
    }

    public void sendAccessAndRefreshToken(HttpServletResponse response, String accessToken, String refreshToken) {
        response.setStatus(HttpServletResponse.SC_OK);
        setAccessTokenHeader(response, accessToken);
        setRefreshTokenHeader(response, refreshToken);
        log.info("[JwtService Access, Refresh Token 헤더 설정 완료]");
    }

    /**
     * 헤더에서 RefreshToken 추출
     */
    public Optional<String> extractRefreshToken(HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader(refreshHeader))
                .filter(refreshToken -> refreshToken.startsWith(BEARER))
                .map(refreshToken -> refreshToken.replace(BEARER, ""));
    }

    /**
     * 헤더에서 AccessToken 추출
     */
    public Optional<String> extractAccessToken(HttpServletRequest request) {
        log.info("[JwtService : extractAccessToken extractAccessToken : {}]", request.getHeader(accessHeader));
        return Optional.ofNullable(request.getHeader(accessHeader))
                .filter(refreshToken -> refreshToken.startsWith(BEARER))
                .map(refreshToken -> refreshToken.replace(BEARER, ""));
    }

    /**
     * AccessToken에서 Email 추출
     * 추출 전에 JWT.require()로 검증기 생성
     * verify로 AceessToken 검증 후
     * 유효하다면 getClaim()으로 이메일 추출
     * 유효하지 않다면 빈 Optional 객체 반환
     */
    public String extractEmail(String accessToken) {
//        try {
//            log.info("이거 실행?");
//            // 토큰 유효성 검사하는 데에 사용할 알고리즘이 있는 JWT verifier builder 반환
//            return Optional.ofNullable(JWT.require(Algorithm.HMAC512(secretKey))
//                    .build() // 반환된 빌더로 JWT verifier 생성
//                    .verify(accessToken) // accessToken을 검증하고 유효하지 않다면 예외 발생
//                    .getClaim(EMAIL_CLAIM) // claim(Emial) 가져오기
//                    .asString());
//        } catch (Exception e) {
//            log.error("액세스 토큰이 유효하지 않습니다.");
//            return Optional.empty();
//        }
        return jwtUtil.getEmail(accessToken);
    }

    public void setAccessTokenHeader(HttpServletResponse response, String accessToken) {
        response.setHeader(accessHeader, accessToken);
    }

    public void setRefreshTokenHeader(HttpServletResponse response, String refreshToken) {
        response.setHeader(refreshHeader, refreshToken);
    }

    public void checkjwt(HttpServletRequest request,HttpServletResponse response,String email2, Long id2) {
        String authorization= request.getHeader("Authorization");
        System.out.println(request.getParameter("email")+"JWTFilter");
        //Authorization 헤더 검증
        if (authorization == null || !authorization.startsWith("Bearer ")) {

            System.out.println("token이 없삼");
//            filterChain.doFilter(request, response);

            //조건이 해당되면 메소드 종료 (필수)
            return;
        }

        System.out.println("jwt 토큰이 있음");
        //Bearer 부분 제거 후 순수 토큰만 획득
        String token = authorization.split(" ")[1];
        //토큰 소멸 시간 검증
        if (jwtUtil.isExpired(token)) {

            System.out.println("token expired");
//            filterChain.doFilter(request, response);

            //조건이 해당되면 메소드 종료 (필수)
            return;
        }

        //토큰에서 username과 role 획득
//        String nickname = jwtUtil.getNickname(token);
        Long id = jwtUtil.getId(token);
        String email = jwtUtil.getEmail(token);
        String role = jwtUtil.getRole(token);

        //userEntity를 생성하여 값 set

        UserEntity userEntity = UserEntity.builder()
//                .nickname(nickname)
                .id(id)
                .email(email)
                .role(role)
                .build();


        //UserDetails에 회원 정보 객체 담기
        CustomUserDetails customUserDetails = new CustomUserDetails(userEntity);

        //스프링 시큐리티 인증 토큰 생성
        Authentication authToken = new NicknameEmailAuthenticationToken(customUserDetails.getEmail(), customUserDetails.getId(), customUserDetails.getAuthorities());
        //세션에 사용자 등록
        SecurityContextHolder.getContext().setAuthentication(authToken);
        System.out.println(SecurityContextHolder.getContext().getAuthentication().getName());
//        filterChain.doFilter(request, response);
    }

    /**
     * RefreshToken DB 저장(업데이트)
     */
//    public void updateRefreshToken(String email, String refreshToken) {
//        userRepository.findByEmail(email)
//                .ifPresentOrElse(
//                        user -> user.updateRefreshToken(refreshToken),
//                        () -> new Exception("일치하는 회원이 없습니다.")
//                );
//    }

//    public boolean isTokenValid(String token) {
//        log.info("JwtService isTokenValid token : {}", token);
//        try {
//            JWT.require(Algorithm.HMAC512(secretKey)).build().verify(token);
//            return true;
//        } catch (Exception e) {
//            log.error("유효하지 않은 토큰입니다. {}", e.getMessage());
//            return false;
//        }
//    }
}
