package com.school.informationsecurity.entities;

import com.school.informationsecurity.services.chat.dto.MessageResponseDTO;
import jakarta.persistence.*;
import java.time.LocalDateTime;
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

    @Column(name = "message", length = 2048)
    private byte[] message;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private MESSAGE_TYPE messageType;

    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id", nullable = false)
    private User receiver;

    @Column(name = "message_hash")
    private String messageHash;

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
