package com.school.informationsecurity.resources.chat;

import java.security.Principal;

import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class ChatSocketResoure {

    private final SimpMessagingTemplate messagingTemplate;
    
    @MessageMapping("/chat")
    @SendToUser("/chat")
    public String chat(Message message, Principal principal) {
        System.out.println("username: " + principal.getName());
        return "";
    }
}
