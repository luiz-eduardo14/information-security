package com.school.informationsecurity.services.cryptography;

import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import javax.crypto.Cipher;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.stereotype.Service;

@Service
public class CryptographyService {
    public static final String SYMMETRIC_ALGORITHM = "AES";
    public static final String ASYMMETRIC_ALGORITHM = "RSA";
    public static final int KEY_SIZE = 2048;

    public byte[] encrypt(byte[] message, Key key, String algorithm) throws Exception {
        Cipher cipher = Cipher.getInstance(algorithm);
        cipher.init(Cipher.ENCRYPT_MODE, key);
        return cipher.doFinal(message);
    }

    public byte[] decrypt(byte[] message, Key key, String algorithm) throws Exception {
        Cipher cipher = Cipher.getInstance(algorithm);
        cipher.init(Cipher.DECRYPT_MODE, key);
        return cipher.doFinal(message);
    }

    public Key generateSymmetricKey(String secret)
        throws NoSuchAlgorithmException, InvalidKeySpecException {
        KeySpec keySpec = new PBEKeySpec(secret.toCharArray(), secret.getBytes(), 65536, 256);
        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
        byte[] key = keyFactory.generateSecret(keySpec).getEncoded();
        return new SecretKeySpec(key, SYMMETRIC_ALGORITHM);
    }
}
