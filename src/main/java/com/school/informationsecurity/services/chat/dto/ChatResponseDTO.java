package com.school.informationsecurity.services.chat.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ChatResponseDTO {
    private List<MessageResponseDTO> messages;
    private String sender;
    private String receiver;
    private String name;
}
