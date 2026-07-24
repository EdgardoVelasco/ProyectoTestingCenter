package com.netec.exams.security;

import java.util.Set;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult;
import org.springframework.security.oauth2.jwt.Jwt;

public final class AllowedIssuerValidator implements OAuth2TokenValidator<Jwt> {
  private static final OAuth2Error INVALID_ISSUER =
      new OAuth2Error("invalid_token", "The token issuer is not allowed", null);

  private final Set<String> allowedIssuers;

  public AllowedIssuerValidator(Set<String> allowedIssuers) {
    this.allowedIssuers = Set.copyOf(allowedIssuers);
  }

  @Override
  public OAuth2TokenValidatorResult validate(Jwt token) {
    String issuer = token.getIssuer() == null ? null : token.getIssuer().toString();
    return issuer != null && allowedIssuers.contains(issuer)
        ? OAuth2TokenValidatorResult.success()
        : OAuth2TokenValidatorResult.failure(INVALID_ISSUER);
  }
}
