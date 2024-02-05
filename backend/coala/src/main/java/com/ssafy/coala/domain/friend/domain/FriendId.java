package com.ssafy.coala.domain.friend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FriendId implements Serializable {
//    @Column(columnDefinition = "BINARY(16)")
    UUID memberFrom;

//    @Column(columnDefinition = "BINARY(16)")
    UUID memberTo;
}
