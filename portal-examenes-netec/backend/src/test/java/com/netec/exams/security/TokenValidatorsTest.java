package com.netec.exams.security;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.Instant;
import java.util.List;
import java.util.Set;
import org.junit.jupiter.api.Test;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtValidators;

class TokenValidatorsTest {
  private static final String TENANT = "tenant-dev";
  private static final String ISSUER = "https://login.microsoftonline.com/tenant-dev/v2.0";

  @Test
  void audienceValidatorAcceptsConfiguredAudience() {
    AudienceValidator validator = new AudienceValidator(Set.of("api://backend-id", "backend-id"));
    assertThat(validator.validate(jwt(ISSUER, TENANT, "api://backend-id")).hasErrors()).isFalse();
  }

  @Test
  void audienceValidatorRejectsUnknownAudience() {
    AudienceValidator validator = new AudienceValidator(Set.of("api://backend-id"));
    assertThat(validator.validate(jwt(ISSUER, TENANT, "another-api")).hasErrors()).isTrue();
  }

  @Test
  void tenantValidatorRejectsAnotherTenant() {
    TenantValidator validator = new TenantValidator(TENANT);
    assertThat(validator.validate(jwt(ISSUER, "another-tenant", "api://backend-id")).hasErrors()).isTrue();
  }

  @Test
  void issuerValidatorRejectsAnotherIssuer() {
    var validator = JwtValidators.createDefaultWithIssuer(ISSUER);
    assertThat(validator.validate(jwt(
        "https://login.microsoftonline.com/another-tenant/v2.0",
        TENANT,
        "api://backend-id")).hasErrors()).isTrue();
  }

  @Test
  void acceptsBothOfficialIssuerFormatsForConfiguredTenant() {
    var validator = new AllowedIssuerValidator(Set.of(
        "https://login.microsoftonline.com/" + TENANT + "/v2.0",
        "https://sts.windows.net/" + TENANT + "/"));

    assertThat(validator.validate(jwtWithIssuer(
        "https://login.microsoftonline.com/" + TENANT + "/v2.0")).hasErrors()).isFalse();
    assertThat(validator.validate(jwtWithIssuer(
        "https://sts.windows.net/" + TENANT + "/")).hasErrors()).isFalse();
  }

  @Test
  void rejectsIssuerFromAnotherTenant() {
    var validator = new AllowedIssuerValidator(Set.of(
        "https://login.microsoftonline.com/" + TENANT + "/v2.0",
        "https://sts.windows.net/" + TENANT + "/"));

    assertThat(validator.validate(jwtWithIssuer(
        "https://sts.windows.net/other-tenant/")).hasErrors()).isTrue();
  }

  private Jwt jwt(String issuer, String tenant, String audience) {
    Instant now = Instant.now();
    return Jwt.withTokenValue("test-token")
        .header("alg", "RS256")
        .subject("subject")
        .issuer(issuer)
        .audience(List.of(audience))
        .issuedAt(now.minusSeconds(30))
        .expiresAt(now.plusSeconds(300))
        .claim("tid", tenant)
        .build();
  }

  private static Jwt jwtWithIssuer(String issuer) {
    return Jwt.withTokenValue("token")
        .header("alg", "none")
        .claim("iss", issuer)
        .build();
  }
}
