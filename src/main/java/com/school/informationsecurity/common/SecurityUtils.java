package com.school.informationsecurity.common;

import org.springframework.security.core.context.SecurityContextHolder;

import com.school.informationsecurity.entities.User;

public class SecurityUtils {
    public static String getCurrentUsername() {
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof User) {
            return ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getEmail();
        } 
        throw new RuntimeException("User not found");
    }
}
