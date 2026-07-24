package com.netec.exams.security;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.Authentication;

class CurrentRequesterControllerTest {

  @Test
  void returnsValidatedLocalIdentityWithoutCredentials() {
    Authentication authentication = mock(Authentication.class);
    when(authentication.getPrincipal()).thenReturn(
        new LocalPrincipal("local-1", "Ana Ventas", "ana@netec.com", "", ""));

    AuthenticatedIdentity identity = new CurrentRequesterController().me(authentication);

    assertThat(identity.subject()).isEqualTo("local-1");
    assertThat(identity.name()).isEqualTo("Ana Ventas");
    assertThat(identity.username()).isEqualTo("ana@netec.com");
    assertThat(identity.scopes()).containsExactly("ExamRequests.Access");
    assertThat(identity.area()).isNull();
    assertThat(identity.businessUnit()).isNull();
  }
}
