package com.netec.exams.security;

import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult;
import org.springframework.security.oauth2.jwt.Jwt;

public final class TenantValidator implements OAuth2TokenValidator<Jwt> {
  private static final OAuth2Error INVALID_TENANT =
      new OAuth2Error("invalid_token", "The token tenant is not allowed.", null);
  private final String tenantId;

  public TenantValidator(String tenantId) {
    this.tenantId = tenantId;
  }

  @Override
  public OAuth2TokenValidatorResult validate(Jwt token) {
    return tenantId.equals(token.getClaimAsString("tid"))
        ? OAuth2TokenValidatorResult.success()
        : OAuth2TokenValidatorResult.failure(INVALID_TENANT);
  }
}
