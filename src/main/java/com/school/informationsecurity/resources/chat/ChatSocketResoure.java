package com.school.informationsecurity.resources.chat;

import com.school.informationsecurity.services.chat.ChatService;
import com.school.informationsecurity.services.chat.dto.MessageRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatSocketResoure {

  private final SimpMessagingTemplate messagingTemplate;

  private final ChatService chatService;

  @MessageMapping("/chat")
  @SendToUser("/topic/chat")
  public MessageRequestDTO chat(MessageRequestDTO message) throws Exception {
    chatService.sendMessage(
        message.getSender(),
        message.getReceiver(),
        message.getMessage(),
        message.getSignMessage()
    );
    return message;
  }

  @MessageMapping("/chat/{username}")
  public void chat(MessageRequestDTO message, @DestinationVariable String username)
      throws Exception {
    this.chatService.sendMessage(
        message.getSender(),
        username,
        message.getMessage(),
        message.getSignMessage()
    );
    this.messagingTemplate.convertAndSendToUser(username, "/topic/chat", message);
  }
}
