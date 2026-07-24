package com.netec.exams.security;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.beans.factory.annotation.Autowired;

@WebMvcTest(CurrentRequesterController.class)
@Import(CurrentRequesterSecurityTest.SecurityConfiguration.class)
class CurrentRequesterSecurityTest {
  @Autowired MockMvc mvc;

  @Test
  void endpointWithoutTokenReturns401() throws Exception {
    mvc.perform(get("/api/auth/me")).andExpect(status().isUnauthorized());
  }

  @Test
  void tokenWithoutScopeReturns403() throws Exception {
    mvc.perform(get("/api/auth/me").with(jwt().jwt(token -> token
            .subject("subject")
            .claim("tid", "tenant")
            .claim("preferred_username", "user@nwr1.onmicrosoft.com"))))
        .andExpect(status().isForbidden());
  }

  @Test
  void validTokenReturnsOnlyAllowedIdentityClaims() throws Exception {
    mvc.perform(get("/api/auth/me").with(jwt()
            .authorities(new SimpleGrantedAuthority(SecurityConfig.REQUIRED_SCOPE))
            .jwt(token -> token
                .subject("subject")
                .claim("oid", "object-id")
                .claim("name", "Usuario Dev")
                .claim("preferred_username", "user@nwr1.onmicrosoft.com")
                .claim("tid", "tenant")
                .claim("scp", "ExamRequests.Access")
                .claim("roles", java.util.List.of()))))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.name").value("Usuario Dev"))
        .andExpect(jsonPath("$.username").value("user@nwr1.onmicrosoft.com"))
        .andExpect(jsonPath("$.scopes[0]").value("ExamRequests.Access"))
        .andExpect(jsonPath("$.token").doesNotExist())
        .andExpect(jsonPath("$.credentials").doesNotExist());
  }

  @Test
  void preferredUsernameHasPrecedenceOverUpnAndEmail() throws Exception {
    mvc.perform(get("/api/auth/me").with(jwt()
            .authorities(new SimpleGrantedAuthority(SecurityConfig.REQUIRED_SCOPE))
            .jwt(token -> token.subject("subject")
                .claim("preferred_username", "preferred@netec.com")
                .claim("upn", "upn@netec.com")
                .claim("email", "email@netec.com")
                .claim("scp", "ExamRequests.Access"))))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.username").value("preferred@netec.com"));
  }

  @Test
  void upnIsUsedWhenPreferredUsernameIsMissing() throws Exception {
    mvc.perform(get("/api/auth/me").with(jwt()
            .authorities(new SimpleGrantedAuthority(SecurityConfig.REQUIRED_SCOPE))
            .jwt(token -> token.subject("subject")
                .claim("upn", "upn@netec.com")
                .claim("email", "email@netec.com")
                .claim("scp", "ExamRequests.Access"))))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.username").value("upn@netec.com"));
  }

  @Test
  void missingUpnReturnsEmptyUsernameWithoutInventingAnEmail() throws Exception {
    mvc.perform(get("/api/auth/me").with(jwt()
            .authorities(new SimpleGrantedAuthority(SecurityConfig.REQUIRED_SCOPE))
            .jwt(token -> token.subject("subject").claim("scp", "ExamRequests.Access"))))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.username").value(""));
  }

  @TestConfiguration
  static class SecurityConfiguration {
    @Bean
    JwtDecoder jwtDecoder() {
      return token -> {
        throw new UnsupportedOperationException("JWT decoding is replaced by security test post-processors.");
      };
    }

    @Bean
    SecurityFilterChain testSecurity(HttpSecurity http) throws Exception {
      return http
          .csrf(csrf -> csrf.disable())
          .authorizeHttpRequests(auth -> auth
              .requestMatchers("/api/auth/me").hasAuthority(SecurityConfig.REQUIRED_SCOPE)
              .anyRequest().denyAll())
          .oauth2ResourceServer(oauth -> oauth.jwt(jwt -> {}))
          .build();
    }
  }
}
