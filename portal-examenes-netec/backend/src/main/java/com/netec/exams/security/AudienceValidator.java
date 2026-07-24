package com.netec.exams.security;

import java.util.Set;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult;
import org.springframework.security.oauth2.jwt.Jwt;

public final class AudienceValidator implements OAuth2TokenValidator<Jwt> {
  private static final OAuth2Error INVALID_AUDIENCE =
      new OAuth2Error("invalid_token", "The token audience is not allowed.", null);
  private final Set<String> allowedAudiences;

  public AudienceValidator(Set<String> allowedAudiences) {
    this.allowedAudiences = Set.copyOf(allowedAudiences);
  }

  @Override
  public OAuth2TokenValidatorResult validate(Jwt token) {
    boolean allowed = token.getAudience().stream().anyMatch(allowedAudiences::contains);
    return allowed
        ? OAuth2TokenValidatorResult.success()
        : OAuth2TokenValidatorResult.failure(INVALID_AUDIENCE);
  }
}
