package com.api.geekbook.services;

import com.api.geekbook.dtos.requests.SignUpRequest;
import com.api.geekbook.dtos.responses.UserResponse;
import com.api.geekbook.entities.UserEntity;
import com.api.geekbook.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserResponse create(SignUpRequest signUpRequest) {
        UserEntity user = new UserEntity();

        BeanUtils.copyProperties(signUpRequest, user);
        user.setPassword(this.passwordEncoder.encode(signUpRequest.password()));

        UserEntity userEntity = this.userRepository.save(user);

        return new UserResponse(
                userEntity.getId(),
                userEntity.getEmail(),
                userEntity.getNickname(),
                userEntity.getAvatar(),
                userEntity.getAuthorizeType(),
                userEntity.getCreatedAt()
        );

    }
}
