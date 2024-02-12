package com.ssafy.coala.domain.member.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
@Table(name = "member_profile")
@Getter
public class MemberProfile {

    //member uuid
    @Id @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name="uuid2", strategy = "uuid2")
    @Column(name = "id", columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(name = "solved_id", unique = true)
    private String solvedId;

    private String email;

    // kakao에서 받아온 nickname
    @Column(name = "kakao_name")
    private String kakaoname;

    // 유저에게 입력받은 nickname -> 고유한 값
    @Column(name = "nick_name", unique = true)
    private String nickname;

    // 소셜 로그인 후 받은 이미지 주소
    @Column(name = "image_url")
    private String imageUrl;

    // 소셜 로그인 타입-> 카카오만 사용할거면 필요 x
    private String socialId;

    private LocalDateTime lastRequest;
}
