package com.school.informationsecurity;

import com.school.informationsecurity.repository.MessageRepository;
import com.school.informationsecurity.repository.UserRepository;
import com.school.informationsecurity.services.authenticate.AuthenticateService;
import com.school.informationsecurity.services.authenticate.dto.UserAuthenticationDTO;
import com.school.informationsecurity.services.chat.ChatService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class MessageServiceTest {

  private final AuthenticateService authenticateService;
  private final UserRepository userRepository;
  private final ChatService chatService;
  private final MessageRepository messageRepository;

  private static final String FIRST_USER_EMAIL = "teste@gmail.com";
  private static final String SECOND_USER_EMAIL = "teste2@gmail.com";
  private static final String THIRD_USER_EMAIL = "teste3@gmail.com";
  private static final String FOUR_USER_EMAIL = "teste4@gmail.com";

  private void registerUsers(String email) {
    if (!userRepository.existsByEmail(email)) {
      var userAuthenticationDTO = UserAuthenticationDTO.builder()
          .email(email)
          .firstName("Teste")
          .lastName("Teste1")
          .password("123456")
          .build();

      try {
        authenticateService.signup(userAuthenticationDTO);
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
  }

  @BeforeEach
  public void setup() {
    this.messageRepository.deleteAll();
    
    List.of(FIRST_USER_EMAIL, SECOND_USER_EMAIL, THIRD_USER_EMAIL, FOUR_USER_EMAIL)
      .forEach(this::registerUsers);
  }

  @Test
  @DisplayName("Deve enviar mensagem ao destinatário")
  @Order(1)
  public void shouldSendMessage() throws Exception {
    var message = "Teste";
    chatService.sendMessage(FIRST_USER_EMAIL, SECOND_USER_EMAIL, message, false);
  }

  @Test
  @DisplayName("Deve receber mensagem do remetente")
  @Order(2)
  public void shouldReceiveMessage() throws Exception {
    var message = "Teste";
    chatService.sendMessage(FIRST_USER_EMAIL, SECOND_USER_EMAIL, message, false);
    chatService.sendMessage(SECOND_USER_EMAIL, FIRST_USER_EMAIL, message, false);

    var chatResponseDTO = chatService.getAllMessagesBySenderAndReceiver(FIRST_USER_EMAIL, SECOND_USER_EMAIL);

    Assertions.assertEquals(2, chatResponseDTO.getMessages().size());
  }

  @Test
  @DisplayName("Deve receber mensagem somente do remetente")
  @Order(3)
  public void shouldReceiveMessageOnlyFromSender() throws Exception {
    var message = "Teste";
    chatService.sendMessage(FIRST_USER_EMAIL, SECOND_USER_EMAIL, message, false);
    chatService.sendMessage(SECOND_USER_EMAIL, FIRST_USER_EMAIL, message, false);
    chatService.sendMessage(THIRD_USER_EMAIL, FIRST_USER_EMAIL, message, false);

    var chatResponseDTO = chatService.getAllMessagesBySenderAndReceiver(FIRST_USER_EMAIL, SECOND_USER_EMAIL);

    Assertions.assertEquals(2, chatResponseDTO.getMessages().size());
  }
}
