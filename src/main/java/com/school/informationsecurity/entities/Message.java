package com.school.informationsecurity.entities;

import com.school.informationsecurity.services.chat.dto.MessageResponseDTO;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "message")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "message")
    private byte[] message;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private MESSAGE_TYPE messageType;

    private LocalDate date;

    @OneToOne
    private User sender;

    @OneToOne
    private User receiver;

    enum MESSAGE_TYPE {
        TEXT,
        FILE
    }

    public MessageResponseDTO convertToMessageResponseDTO() {
        return MessageResponseDTO.builder()
                .sender(this.sender.getEmail())
                .message(new String(this.message))
                .build();
    }
}
