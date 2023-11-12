package com.school.informationsecurity;

import com.school.informationsecurity.services.authenticate.AuthenticateService;
import com.school.informationsecurity.services.authenticate.dto.UserAuthenticationDTO;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class AuthenticateServiceTest {

  private final AuthenticateService authenticateService;

  @Test
  @Order(1)
  @DisplayName("Criação de novo usuário")
  public void shouldCreateNewUser() throws Exception {
    var userAuthenticationDTO = UserAuthenticationDTO.builder()
        .email("teste@gmail.com")
        .firstName("Teste")
        .lastName("Teste")
        .password("123456")
        .build();

    authenticateService.signup(userAuthenticationDTO);
  }

  @Test
  @Order(2)
  @DisplayName("Login de usuário")
  public void shouldLoginUser() throws Exception {
    var userAuthenticationDTO = UserAuthenticationDTO.builder()
        .email("teste@gmail.com")
        .password("123456")
        .build();

    var jwtResultDTO = authenticateService.signin(userAuthenticationDTO);

    assertNotNull(jwtResultDTO);
  }
}
