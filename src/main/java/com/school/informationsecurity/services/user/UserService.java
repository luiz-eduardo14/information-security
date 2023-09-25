package com.school.informationsecurity.services.user;

import org.springframework.stereotype.Service;

import com.school.informationsecurity.repository.UserRepository;
import com.school.informationsecurity.services.user.dto.UserDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserDTO getUser(String email) {
        return userRepository.findByEmail(email).map(user -> {
            return UserDTO.builder()
                    .email(user.getEmail())
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .role(user.getRole())
                    .build();
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }
}
