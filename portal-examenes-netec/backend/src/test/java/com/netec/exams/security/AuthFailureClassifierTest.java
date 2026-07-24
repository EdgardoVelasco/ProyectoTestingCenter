package com.netec.exams.security;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.BadCredentialsException;

class AuthFailureClassifierTest {
  @Test
  void classifiesIssuerWithoutExposingDetails() {
    assertThat(AuthFailureClassifier.classify(
        new BadCredentialsException("The iss claim is not valid"))).isEqualTo("ISSUER");
  }

  @Test
  void classifiesAudienceWithoutExposingDetails() {
    assertThat(AuthFailureClassifier.classify(
        new BadCredentialsException("The token audience is not allowed"))).isEqualTo("AUDIENCE");
  }

  @Test
  void usesGenericCategoryForUnknownFailure() {
    assertThat(AuthFailureClassifier.classify(
        new BadCredentialsException("Rejected"))).isEqualTo("INVALID_TOKEN");
  }
}
