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
    var text = "Teste";
    var keyAES = cryptographyService.generateSymmetricKey(text);
    var encryptedText = cryptographyService.encrypt(text.getBytes(StandardCharsets.UTF_8), keyAES,
        CryptographyService.SYMMETRIC_ALGORITHM);
    var decryptedText = new String(cryptographyService.decrypt(encryptedText, keyAES,
        CryptographyService.SYMMETRIC_ALGORITHM));

    assertNotEquals(text, encryptedText);
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

    var encryptedText = cryptographyService.encrypt(text.getBytes(StandardCharsets.UTF_8),
        publicKey,
        CryptographyService.ASYMMETRIC_ALGORITHM);

    var decryptedText = new String(cryptographyService.decrypt(encryptedText, privateKey,
        CryptographyService.ASYMMETRIC_ALGORITHM));

    assertNotEquals(text, encryptedText);
    assertEquals(text, decryptedText);
  }

}
