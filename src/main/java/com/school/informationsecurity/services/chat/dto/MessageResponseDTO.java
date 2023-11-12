package com.school.informationsecurity.services.chat.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageResponseDTO {
    private String sender;
    private String message;
    private String name;
    private LocalDateTime date;
    private Boolean valid;
}
