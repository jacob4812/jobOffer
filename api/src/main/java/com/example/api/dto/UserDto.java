package com.example.api.dto;

public record UserDto(
        Long id,
        String Login,
        String Password
) {
}
