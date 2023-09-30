package com.school.informationsecurity.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "message")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "message")
    private byte[] message;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private MESSAGE_TYPE messageType;

    private String sender;

    private LocalDate date;

    enum MESSAGE_TYPE {
        TEXT,
        FILE
    }
}
