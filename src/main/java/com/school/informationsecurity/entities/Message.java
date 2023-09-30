package com.school.informationsecurity.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "message")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "message")
    private byte[] message;

    @Column(name = "message_type")
    @Enumerated(EnumType.STRING)
    private MESSAGE_TYPE messageType;

    @OneToOne
    @JoinColumn(name = "sender_id")
    private User user;

    enum MESSAGE_TYPE {
        TEXT,
        FILE
    }
}
