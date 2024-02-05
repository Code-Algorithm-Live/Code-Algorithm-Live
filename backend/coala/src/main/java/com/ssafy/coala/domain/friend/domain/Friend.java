package com.ssafy.coala.domain.friend.domain;

import com.ssafy.coala.domain.member.domain.Member;
import com.ssafy.coala.domain.problem.domain.TagId;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@IdClass(FriendId.class)
@Table(indexes = {
        @Index(columnList = "member_from")})
public class Friend {

    @Id
    @Column(columnDefinition = "BINARY(16)")
    UUID memberFrom;
    @Id
    @Column(columnDefinition = "BINARY(16)")
    UUID memberTo;
}
