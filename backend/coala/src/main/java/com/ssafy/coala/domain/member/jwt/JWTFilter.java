package com.ssafy.coala.domain.member.jwt;

import com.ssafy.coala.domain.member.domain.Member;
import com.ssafy.coala.domain.member.dto.CustomUserDetails;
import com.ssafy.coala.domain.member.domain.MemberProfile;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;
    private final RedisTemplate<String, String> redisStringTemplate;

    public JWTFilter(JWTUtil jwtUtil, RedisTemplate<String, String> redisStringTemplate) {
        this.jwtUtil = jwtUtil;
        this.redisStringTemplate = redisStringTemplate;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //request에서 Authorization 헤더를 찾음
        String authorization= request.getHeader("Authorization");

        //Authorization 헤더 검증
        if (authorization == null || !authorization.startsWith("Bearer ")) {

            System.out.println("token null");
            filterChain.doFilter(request, response);

            //조건이 해당되면 메소드 종료 (필수)
            return;
        }

        System.out.println("authorization now");
        //Bearer 부분 제거 후 순수 토큰만 획득
        String token = authorization.split(" ")[1];
        String refToken = redisStringTemplate.opsForValue().get("JWT_TOKEN:" + jwtUtil.getEmail(token));
        System.out.println(refToken+"로그인중인 토큰 있는지 확인");
        if ( refToken == null) {
            System.out.println("만료된 토큰입니다");
            filterChain.doFilter(request,response);
            return;
        }

        //토큰 소멸 시간 검증
        if (jwtUtil.isExpired(token)) {
            System.out.println("token expired");
            String refreshToken =  redisStringTemplate.opsForValue().get(jwtUtil.getEmail(token));
            //리프레쉬 토큰 유무, 소멸시간 검증
            if(refreshToken!=null&&jwtUtil.isExpired(refreshToken)){
                redisStringTemplate.delete(token);
                String username = jwtUtil.getNickname(token);
                String email = jwtUtil.getEmail(token);
                String newtoken = jwtUtil.createJwt(username, email, 24L * 60L * 60L * 1000L); //24시간
                String newRefeshToken = jwtUtil.createRefreshJwt(30L* 24L * 60L * 60L * 1000L); //30일

                redisStringTemplate.opsForValue().set(email,newRefeshToken,30L* 24L * 60L * 60L * 1000L,TimeUnit.MILLISECONDS);
                redisStringTemplate.opsForValue().set("JWT_TOKEN:" + email, newtoken,24L * 60L * 60L * 1000L, TimeUnit.MILLISECONDS);
                response.addHeader("Authorization", "Bearer " + newtoken);
                System.out.println("리프레쉬 토큰 검증 후 새로운 토큰 헤더에 담아 응답");
            }



            filterChain.doFilter(request, response);

            //조건이 해당되면 메소드 종료 (필수)
            return;
        }

        //토큰에서 username과 role 획득
        String username = jwtUtil.getNickname(token);
        String email = jwtUtil.getEmail(token);

        //userEntity를 생성하여 값 set
        Member member = Member.builder()
                .nickname(username)
                .email(email)
                .build();

        //UserDetails에 회원 정보 객체 담기
        CustomUserDetails customUserDetails = new CustomUserDetails(member);

        //스프링 시큐리티 인증 토큰 생성
        Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
        //세션에 사용자 등록
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);

    }
}
