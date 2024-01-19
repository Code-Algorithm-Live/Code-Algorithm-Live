package com.ssafy.coala.test.repository;

import com.ssafy.coala.test.entity.UserEntity;
import com.ssafy.coala.test.oauth2.user.SocialType;
import com.ssafy.coala.test.oauth2.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {


    Optional<User> findByEmail(String email);
    Optional<User> findByNickname(String nickname);
    Optional<User> findByRefreshToken(String refreshToken);
    Optional<User> findBySocialTypeAndSocialId(SocialType socialType, String socialId);
}
