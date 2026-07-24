package com.netec.exams.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.oauth2.jwt.JwtValidators;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

@Configuration
public class SecurityConfig {
  static final String REQUIRED_SCOPE = "SCOPE_ExamRequests.Access";

  @Bean
  @Profile("!local")
  JwtDecoder jwtDecoder(
      @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}") String issuer,
      @Value("${app.entra.tenant-id}") String tenantId,
      @Value("${app.entra.allowed-audiences}") List<String> audiences) {
    NimbusJwtDecoder decoder = (NimbusJwtDecoder) JwtDecoders.fromIssuerLocation(issuer);
    Set<String> allowed = new HashSet<>(audiences);
    Set<String> allowedIssuers = Set.of(
        "https://login.microsoftonline.com/" + tenantId + "/v2.0",
        "https://sts.windows.net/" + tenantId + "/");
    decoder.setJwtValidator(new DelegatingOAuth2TokenValidator<>(
        JwtValidators.createDefault(),
        new AllowedIssuerValidator(allowedIssuers),
        new AudienceValidator(allowed),
        new TenantValidator(tenantId)));
    return decoder;
  }

  @Bean
  @Profile("!local")
  SecurityFilterChain entra(
      HttpSecurity http,
      @Value("${app.authorization.allow-tenant-users:false}") boolean allowTenantUsers)
      throws Exception {
    JwtGrantedAuthoritiesConverter scopes = new JwtGrantedAuthoritiesConverter();
    JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
    converter.setJwtGrantedAuthoritiesConverter(jwt -> authorities(jwt, scopes));

    return http
        .csrf(csrf -> csrf.disable())
        .cors(cors -> {})
        .authorizeHttpRequests(auth -> {
          auth.requestMatchers("/actuator/health/**").permitAll();
          if (allowTenantUsers) {
            auth.requestMatchers("/api/**").hasAuthority(REQUIRED_SCOPE);
          } else {
            auth.requestMatchers("/api/**").access((authentication, context) -> {
              Collection<? extends GrantedAuthority> granted = authentication.get().getAuthorities();
              boolean hasScope = granted.stream().anyMatch(a -> REQUIRED_SCOPE.equals(a.getAuthority()));
              boolean hasRole = granted.stream().anyMatch(a ->
                  "ROLE_EXAM_SALES".equals(a.getAuthority()) || "ROLE_EXAM_ADMIN".equals(a.getAuthority()));
              return new AuthorizationDecision(hasScope && hasRole);
            });
          }
          auth.anyRequest().denyAll();
        })
        .oauth2ResourceServer(oauth -> oauth
            .authenticationEntryPoint(new SafeBearerAuthenticationEntryPoint(allowTenantUsers))
            .jwt(jwt -> jwt.jwtAuthenticationConverter(converter)))
        .build();
  }

  private static Collection<GrantedAuthority> authorities(
      Jwt jwt, JwtGrantedAuthoritiesConverter scopes) {
    Collection<GrantedAuthority> granted = new ArrayList<>(scopes.convert(jwt));
    List<String> roles = jwt.getClaimAsStringList("roles");
    if (roles != null) {
      roles.stream()
          .filter(role -> role.equals("EXAM_SALES") || role.equals("EXAM_ADMIN"))
          .map(role -> (GrantedAuthority) new SimpleGrantedAuthority("ROLE_" + role))
          .forEach(granted::add);
    }
    return granted;
  }

  @Bean
  @Profile("local")
  SecurityFilterChain local(HttpSecurity http, LocalIdentityFilter filter) throws Exception {
    return http
        .csrf(csrf -> csrf.disable())
        .cors(cors -> {})
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/actuator/health/**").permitAll()
            .requestMatchers("/api/**").hasAuthority(REQUIRED_SCOPE)
            .anyRequest().denyAll())
        .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class)
        .build();
  }
}

@Component
@Profile("local")
class LocalIdentityFilter extends org.springframework.web.filter.OncePerRequestFilter {
  private final LocalPrincipal principal;

  LocalIdentityFilter(
      @Value("${app.local-user.id}") String id,
      @Value("${app.local-user.name}") String name,
      @Value("${app.local-user.email}") String email,
      @Value("${app.local-user.area:}") String area,
      @Value("${app.local-user.business-unit:}") String unit) {
    principal = new LocalPrincipal(id, name, email, area, unit);
  }

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws ServletException, IOException {
    if (SecurityContextHolder.getContext().getAuthentication() == null) {
      List<GrantedAuthority> authorities = List.of(
          new SimpleGrantedAuthority("ROLE_EXAM_SALES"),
          new SimpleGrantedAuthority(SecurityConfig.REQUIRED_SCOPE));
      SecurityContextHolder.getContext().setAuthentication(
          new UsernamePasswordAuthenticationToken(principal, "N/A", authorities));
    }
    chain.doFilter(request, response);
  }
}
