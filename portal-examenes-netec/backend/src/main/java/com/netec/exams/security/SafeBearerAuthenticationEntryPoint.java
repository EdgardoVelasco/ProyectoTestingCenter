package com.netec.exams.security;

import java.io.IOException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

final class SafeBearerAuthenticationEntryPoint implements AuthenticationEntryPoint {
  private static final Logger LOGGER =
      LoggerFactory.getLogger(SafeBearerAuthenticationEntryPoint.class);
  private final boolean exposeDiagnosticHeader;

  SafeBearerAuthenticationEntryPoint(boolean exposeDiagnosticHeader) {
    this.exposeDiagnosticHeader = exposeDiagnosticHeader;
  }

  @Override
  public void commence(
      HttpServletRequest request,
      HttpServletResponse response,
      AuthenticationException exception) throws IOException {
    String category = AuthFailureClassifier.classify(exception);
    LOGGER.warn("Protected API authentication rejected: category={}", category);
    if (exposeDiagnosticHeader) response.setHeader("X-Auth-Diagnostic", category);
    response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
  }
}
