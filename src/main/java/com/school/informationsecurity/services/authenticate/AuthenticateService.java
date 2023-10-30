package com.school.informationsecurity.services.authenticate;

import com.school.informationsecurity.entities.Role;
import com.school.informationsecurity.entities.Status;
import com.school.informationsecurity.entities.User;
import com.school.informationsecurity.repository.UserRepository;
import com.school.informationsecurity.security.JwtTokenUtil;
import com.school.informationsecurity.services.authenticate.dto.JwtResponseDTO;
import com.school.informationsecurity.services.authenticate.dto.UserAuthenticationDTO;
import com.school.informationsecurity.services.cryptography.CryptographyService;
import java.security.Key;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticateService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtTokenUtil jwtService;
  private final AuthenticationManager authenticationManager;
  private final CryptographyService cryptographyService;

  public JwtResponseDTO signup(UserAuthenticationDTO dto) throws Exception {

    if (userRepository.existsByEmail(dto.getEmail())) {
      throw new IllegalArgumentException("Email already exists");
    }

    KeyPairGenerator kpg = KeyPairGenerator.getInstance(CryptographyService.ASYMMETRIC_ALGORITHM);

    kpg.initialize(CryptographyService.KEY_SIZE);

    KeyPair kp = kpg.genKeyPair();
    Key publicKey = kp.getPublic();
    Key privateKey = kp.getPrivate();

    String passwordHash = passwordEncoder.encode(dto.getPassword());

    Key secretKey = cryptographyService.generateSymmetricKey(passwordHash);

    byte[] encryptedPrivateKey = this.cryptographyService.encrypt(privateKey.getEncoded(),
        secretKey, CryptographyService.SYMMETRIC_ALGORITHM);

    User user = User.builder()
        .firstName(dto.getFirstName())
        .lastName(dto.getLastName())
        .email(dto.getEmail())
        .password(passwordHash)
        .status(Status.ACTIVE)
        .publicKey(publicKey.getEncoded())
        .privateKey(encryptedPrivateKey)
        .role(Role.USER)
        .build();
    userRepository.save(user);
    String jwt = jwtService.generateToken(user);
    return JwtResponseDTO.builder().token(jwt).build();
  }

  public JwtResponseDTO signin(UserAuthenticationDTO dto) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));
    User user = userRepository.findByEmail(dto.getEmail())
        .orElseThrow(() -> new IllegalArgumentException("Invalid email"));
    String jwt = jwtService.generateToken(user);
    return JwtResponseDTO.builder().token(jwt).build();
  }

  public Pair<byte[], byte[]> getUserKeys(byte[] publicKey, byte[] privateKey, String passwordHash) throws Exception {
    Key secretKey = cryptographyService.generateSymmetricKey(passwordHash);
    byte[] decryptedPrivateKey = this.cryptographyService.decrypt(privateKey, secretKey, CryptographyService.SYMMETRIC_ALGORITHM);
    return Pair.of(publicKey, decryptedPrivateKey);
  }
}
