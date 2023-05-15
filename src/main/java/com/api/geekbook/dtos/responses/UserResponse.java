package com.api.geekbook.dtos.responses;

import com.api.geekbook.enums.OAuthType;

import java.time.LocalDateTime;

public record UserResponse(Long id,
                           String email,
                           String nickname,
                           String avatar,
                           OAuthType authorizeType,
                           LocalDateTime created_at) {
}
