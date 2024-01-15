package com.ssafy.coala.config;

//import com.fasterxml.classmate.TypeResolver;


import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;



@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("코알라 API")
                        .description("백준 문제 추천, 페어 프로그래밍 등의 기능을 제공합니다")
                        .version("1.0.0"));
    }
}