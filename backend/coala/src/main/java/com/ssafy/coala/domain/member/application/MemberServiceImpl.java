package com.ssafy.coala.domain.member.application;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ssafy.coala.domain.member.dao.MemberRepository;
import com.ssafy.coala.domain.member.domain.Member;
import com.ssafy.coala.domain.member.dto.KakaoTokenDto;

import com.ssafy.coala.domain.member.dto.KakaoUserDto;
import com.ssafy.coala.domain.member.domain.MemberProfile;
import com.ssafy.coala.domain.member.dao.MemberProfileRepository;
import com.ssafy.coala.domain.member.dto.MemberDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;

@Service
@Transactional
public class MemberServiceImpl implements MemberService {


    private final MemberProfileRepository memberProfileRepository;
    private final MemberRepository memberRepository;
    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String KAKAO_CLIENT_ID;
    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String KAKAO_REDIRECT_URI;
    @Value("${spring.security.oauth2.client.registration.kakao.secretkey}")
    private String KAKAO_CLIENT_SECRET;

    @Value("${spring.security.oauth2.client.registration.kakao.kakao-token-uri}")
    private String KAKAO_TOKEN_URI;

    @Value("${spring.security.oauth2.client.provider.kakao.user-info-uri}")
    private String KAKAO_USER_INFO_URI;

    public MemberServiceImpl(MemberProfileRepository memberProfileRepository, MemberRepository memberRepository) {
        this.memberProfileRepository = memberProfileRepository;
        this.memberRepository = memberRepository;
    }

    @Override
    public KakaoTokenDto getKakaoAccessToken(String code) {
        System.out.println("rest api : " + KAKAO_CLIENT_ID);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // Http Response Body 객체 생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code"); //카카오 공식문서 기준 authorization_code 로 고정
        params.add("client_id", KAKAO_CLIENT_ID); // 카카오 Dev 앱 REST API 키
        params.add("redirect_uri", KAKAO_REDIRECT_URI); // 카카오 Dev redirect uri
        params.add("code", code); // 프론트에서 인가 코드 요청시 받은 인가 코드값
        params.add("client_secret", KAKAO_CLIENT_SECRET); // 카카오 Dev 카카오 로그인 Client Secret

        // 헤더와 바디 합치기 위해 Http Entity 객체 생성
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

        // 카카오로부터 Access token 받아오기
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> accessTokenResponse = rt.exchange(
                KAKAO_TOKEN_URI, // "https://kauth.kakao.com/oauth/token"
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );
//        System.out.println(accessTokenResponse.getBody());
        // JSON Parsing (-> KakaoTokenDto)
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        KakaoTokenDto kakaoTokenDto = null;
        try {
            kakaoTokenDto = objectMapper.readValue(accessTokenResponse.getBody(), KakaoTokenDto.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return kakaoTokenDto;
    }

    @Override
    public KakaoUserDto kakaoLogin(String kakaoAccessToken) throws Exception {
        KakaoUserDto user = getKakaoInfo(kakaoAccessToken);

        if (memberProfileRepository.findByEmail(user.getEmail()).isPresent()) {
            System.out.println("기존 회원임 로그인 진행");
        }else{
            System.out.println("기존 회원이 아니므로 회원정보 저장");
            MemberProfile memberProfile = MemberProfile.builder()
                    .email(user.getEmail())
                    .nickname(user.getNickname())
                    .imageUrl(user.getImg_url())
                    .build();

            memberProfileRepository.save(memberProfile);
        }
        return user;
    }

    @Override
    public KakaoUserDto getKakaoInfo(String kakaoAccessToken) throws JsonProcessingException {
        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + kakaoAccessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> accountInfoRequest = new HttpEntity<>(headers);

        // POST 방식으로 API 서버에 요청 후 response 받아옴
        ResponseEntity<String> accountInfoResponse = rt.exchange(
                KAKAO_USER_INFO_URI, // "https://kapi.kakao.com/v2/user/me"
                HttpMethod.POST,
                accountInfoRequest,
                String.class
        );

        String responseBody = accountInfoResponse.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);

        Long id = jsonNode.get("id").asLong();
        String email = jsonNode.get("kakao_account").get("email").asText();
        String nickname = jsonNode.get("properties")
                .get("nickname").asText();
        String img_url = jsonNode.get("properties").get("thumbnail_image").asText();


        return new KakaoUserDto(id, email, nickname,img_url);

    }

    @Override
    public boolean check(MemberDto member) {

        return memberProfileRepository.existsByEmail(member.getEmail());
    }

    @Override
    public void signUp(MemberDto memberDto, String solvedId) {
        MemberProfile memberProfile = MemberProfile.builder()
                .nickname(memberDto.getName())
                .email(memberDto.getEmail())
                .solvedId(solvedId)
                .imageUrl(memberDto.getImage())
                .build();

        memberProfileRepository.save(memberProfile);
        MemberProfile tmpmember = memberProfileRepository.findBySolvedId(solvedId);


        Member member = Member.builder()
                .id(tmpmember.getId())
                .email(tmpmember.getEmail())
                .solvedId(solvedId)
                .build();
        memberRepository.save(member);
    }

    @Override
    public MemberProfile getMemberProfile(UUID uuid) {
        return memberProfileRepository.findById(uuid);
    }

    @Override
    public Member getMember(UUID uuid) {
        return memberRepository.findById(uuid);
    }
}
