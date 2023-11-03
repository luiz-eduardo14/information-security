package com.school.informationsecurity.entities;

import jakarta.persistence.Index;
import jakarta.persistence.SequenceGenerator;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users",
        indexes = {
       @Index(name = "idx_email", columnList = "email", unique = true)
    }
)
@SequenceGenerator(name = "seq_users", sequenceName = "seq_users", allocationSize = 1)
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Nonnull
    private String password;
    @Nonnull
    @Column(unique = true)
    private String email;
    @Column(name = "first_name")
    @Nonnull
    private String firstName;
    @Column(name = "last_name")
    @Nonnull
    private String lastName;
    @Enumerated(EnumType.STRING)
    private Role role = Role.GENERIC;
    @Enumerated(EnumType.STRING)
    private Status status = Status.INACTIVE;
    @Column(name = "public_key", length = 2048)
    private byte[] publicKey;
    @Column(name = "private_key", length = 2048)
    private byte[] privateKey;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(Optional.ofNullable(role).map(Role::name).orElse(Role.GENERIC.name())));
    }
    @Override
    public boolean isAccountNonExpired() {
        return this.isUserActive();
    }
    @Override
    public boolean isAccountNonLocked() {
        return this.isUserActive();
    }
    @Override
    public boolean isCredentialsNonExpired() {
        return this.isUserActive();
    }
    
    @Override
    public boolean isEnabled() {
        return this.isUserActive();
    }
    @Override
    public String getUsername() {
        return this.email;
    }

    private boolean isUserActive() {
        return Optional.ofNullable(this.status).map(status -> status.equals(Status.ACTIVE)).orElse(false);
    }
}
