package com.school.informationsecurity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import com.school.informationsecurity.services.cryptography.CryptographyService;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class CryptographyServiceTest {

  private final CryptographyService cryptographyService;

  @Test
  @DisplayName("Deve gerar chave simétrica e criptografar e descriptografar com a mesma chave")
  public void shouldEncryptAndDecryptWithSymmetricKey() throws Exception {
    String text = "Teste";
    Key keyAES = cryptographyService.generateSymmetricKey(text);
    byte[] encryptedText = cryptographyService.encrypt(text.getBytes(StandardCharsets.UTF_8), keyAES,
        CryptographyService.SYMMETRIC_ALGORITHM);
    String decryptedText = new String(cryptographyService.decrypt(encryptedText, keyAES,
        CryptographyService.SYMMETRIC_ALGORITHM));

    assertEquals(text, decryptedText);
  }

  @Test
  @DisplayName("Deve gerar chave assimétrica e criptografar e descriptografar com a mesma chave")
  public void shouldEncryptAndDecryptWithAsymmetricKey() throws Exception {
    var text = "Teste";

    KeyPairGenerator kpg = KeyPairGenerator.getInstance(CryptographyService.ASYMMETRIC_ALGORITHM);
    KeyPair kp = kpg.genKeyPair();
    Key publicKey = kp.getPublic();
    Key privateKey = kp.getPrivate();

    byte[] encryptedText = cryptographyService.encrypt(text.getBytes(StandardCharsets.UTF_8),
        publicKey,
        CryptographyService.ASYMMETRIC_ALGORITHM);

    String decryptedText = new String(cryptographyService.decrypt(encryptedText, privateKey,
        CryptographyService.ASYMMETRIC_ALGORITHM));

    assertEquals(text, decryptedText);
  }

}
