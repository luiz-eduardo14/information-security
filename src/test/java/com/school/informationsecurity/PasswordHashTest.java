package com.school.informationsecurity;

import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
class PasswordHashTest {

    private final PasswordEncoder passwordEncoder;

    @Test
    @DisplayName("Should Encrypt Password")
    void Should_EncryptPassword_When_PasswordIsGiven() {
        String password = "password";
        String encodedPassword = passwordEncoder.encode(password);

        assertNotEquals(password, encodedPassword);
    }
}
