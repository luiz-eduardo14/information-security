package com.school.informationsecurity.services.authenticate;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.school.informationsecurity.entities.Status;
import com.school.informationsecurity.entities.User;
import com.school.informationsecurity.repository.UserRepository;
import com.school.informationsecurity.security.JwtTokenUtil;
import com.school.informationsecurity.services.authenticate.dto.JwtResponseDTO;
import com.school.informationsecurity.services.authenticate.dto.UserAuthenticationDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticateService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtil jwtService;
    private final AuthenticationManager authenticationManager;

    public JwtResponseDTO signup(UserAuthenticationDTO dto) {
        User user = User.builder().firstName(dto.getFirstName()).lastName(dto.getLastName())
                .email(dto.getEmail()).password(passwordEncoder.encode(dto.getPassword()))
                .status(Status.ACTIVE)
                .build();
        userRepository.save(user);
        String jwt = jwtService.generateToken(user);
        return JwtResponseDTO.builder().token(jwt).build();
    }

    public JwtResponseDTO signin(UserAuthenticationDTO dto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email"));
        String jwt = jwtService.generateToken(user);
        return JwtResponseDTO.builder().token(jwt).build();
    }
}
