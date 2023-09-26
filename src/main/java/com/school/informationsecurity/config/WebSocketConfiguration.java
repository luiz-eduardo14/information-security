package com.school.informationsecurity.config;

import com.school.informationsecurity.security.JwtTokenUtil;
import io.jsonwebtoken.Jwt;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.config.annotation.web.socket.EnableWebSocketSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.messaging.access.intercept.MessageMatcherDelegatingAuthorizationManager;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import java.util.List;

@Configuration
@EnableWebSocket
@EnableWebSocketSecurity
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {
    private final JwtTokenUtil jwtService;
    private final UserDetailsService userService;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/socket").withSockJS();
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor =
                        MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

                if (accessor == null) {
                    throw new IllegalArgumentException("Invalid token");
                }

                if (StompCommand.CONNECT.equals(accessor.getCommand())) {
                    String authorization = accessor.getNativeHeader("X-Authorization").get(0);
//                    logger.debug("X-Authorization: {}", authorization);
                    final String userEmail = jwtService.getUsernameFromToken(authorization);
                    if (StringUtils.isEmpty(userEmail)) {
                        throw new IllegalArgumentException("Invalid token");
                    }
                    final UserDetails userDetails = userService.loadUserByUsername(userEmail);

                    if (!jwtService.isTokenValid(authorization, userDetails)) {
                        throw new IllegalArgumentException("Invalid token");
                    }

                    Authentication authentication = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    accessor.setUser(authentication);
                }
                return message;
            }
        });
    }

    @Bean
    AuthorizationManager<Message<?>> messageAuthorizationManager(MessageMatcherDelegatingAuthorizationManager.Builder messages) {
        messages
        .nullDestMatcher().authenticated()
        .anyMessage().authenticated();

        return messages.build();
    }
}
