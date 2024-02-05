package com.ssafy.coala.domain.member.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class KakaoTokenDto {
    private String access_token;
    private String token_type;
    private String refresh_token;
    private String id_token;
    private int expires_in;
    private int refresh_token_Expires_in;
    private String scope;

}
