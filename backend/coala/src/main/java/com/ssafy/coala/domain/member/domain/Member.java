package com.ssafy.coala.domain.member.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
@ToString
public class Member implements Serializable {

    // member_profile 만들어질 때 생성된 id 받아옴
    @Id
    @Column(name = "id", columnDefinition = "BINARY(16)")
    private UUID id;

    //생성 시간
    @Column(name = "regist_date")
    @CreatedDate
    private LocalDateTime registDate;

    //email을 bcrypt 암호화해서 저장함
    private String password;

    //소셜 로그인 후 얻어온 프로필 이미지
    @Column(name = "image_url")
    private String imageUrl;

    //경험치... 등급? 단계? 같은 것도 만들어야 할듯함 레벨업까지 필요 경험치 테이블 같은 것도 필요해보임
    @ColumnDefault("0")
    @Column(name = "member_exp")
    private int exp;

    //solvedac id
    @Column(name = "solved_id", unique = true)
    private String solvedId;

    //소셜로그인한 email
    @Column(name = "email")
    private String email;

    //회원가입 할 때 유저한테 입력받은 nickname
    @Column(name = "nick_name", unique = true)
    private String nickname;
}
