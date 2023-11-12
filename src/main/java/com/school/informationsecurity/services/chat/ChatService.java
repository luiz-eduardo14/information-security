package com.school.informationsecurity.services.chat;

import com.school.informationsecurity.entities.Message;
import com.school.informationsecurity.entities.User;
import com.school.informationsecurity.repository.MessageRepository;
import com.school.informationsecurity.repository.UserRepository;
import com.school.informationsecurity.services.chat.dto.ChatResponseDTO;
import com.school.informationsecurity.services.chat.dto.MessageResponseDTO;
import com.school.informationsecurity.services.cryptography.CryptographyService;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatService {

  private final MessageRepository messageRepository;
  private final UserRepository userRepository;
  private final CryptographyService cryptographyService;

  public ChatResponseDTO getAllMessagesBySenderAndReceiver(String sender, String receiver) {
    final User senderUser = this.userRepository.findByEmail(sender).orElseThrow();
    final User receiverUser = this.userRepository.findByEmail(receiver).orElseThrow();

    List<MessageResponseDTO> messageResponseDTOS =
        this.messageRepository.getAllMessagesBySenderAndReceiver(sender, receiver)
            .stream()
            .map(this::convertToMessageResponseDTO)
            .toList();

    return ChatResponseDTO.builder()
        .sender(senderUser.getEmail())
        .receiver(receiverUser.getEmail())
        .messages(messageResponseDTOS)
        .build();
  }

  public void sendMessage(String sender, String receiver, String message)
      throws Exception {
    Optional<User> senderUser = this.userRepository.findByEmail(sender);
    Optional<User> receiverUser = this.userRepository.findByEmail(receiver);

    if (senderUser.isPresent() && receiverUser.isPresent()) {

      var senderUserNotOptional = senderUser.orElseThrow();
      var receiverUserNotOptional = receiverUser.orElseThrow();

      PublicKey publicKey =
          KeyFactory.getInstance(CryptographyService.ASYMMETRIC_ALGORITHM)
              .generatePublic(new X509EncodedKeySpec(receiverUserNotOptional.getPublicKey()));

      var messageEncryped = this.cryptographyService.encrypt(
          message.getBytes(StandardCharsets.UTF_8), publicKey,
          CryptographyService.ASYMMETRIC_ALGORITHM);

      Message messageEntity = Message.builder()
          .message(messageEncryped)
          .sender(senderUserNotOptional)
          .receiver(receiverUserNotOptional)
          .build();

      this.messageRepository.save(messageEntity);
    }
  }


  private MessageResponseDTO convertToMessageResponseDTO(Message message) {
    MessageResponseDTO messageResponseDTO = new MessageResponseDTO();
    messageResponseDTO.setSender(message.getSender().getEmail());
    messageResponseDTO.setName(message.getSender().getFirstName());
    messageResponseDTO.setDate(message.getDate());

    try {
      byte[] messageDecrypted = this.decryptMessage(message.getMessage(),
          message.getReceiver().getPrivateKey(), message.getReceiver().getPassword());
      messageResponseDTO.setMessage(new String(messageDecrypted));
      return messageResponseDTO;
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  private byte[] decryptMessage(byte[] message, byte[] privateKeyEncryptedByPassword,
      String passwordHash) throws Exception {
    byte[] privateKeyDecryptedByPassword = this.cryptographyService.decrypt(
        privateKeyEncryptedByPassword, this.cryptographyService.generateSymmetricKey(passwordHash),
        CryptographyService.SYMMETRIC_ALGORITHM);

    Key privateKey =
        KeyFactory.getInstance(CryptographyService.ASYMMETRIC_ALGORITHM)
            .generatePrivate(new PKCS8EncodedKeySpec(privateKeyDecryptedByPassword));

    return this.cryptographyService.decrypt(message, privateKey,
        CryptographyService.ASYMMETRIC_ALGORITHM);
  }
}
