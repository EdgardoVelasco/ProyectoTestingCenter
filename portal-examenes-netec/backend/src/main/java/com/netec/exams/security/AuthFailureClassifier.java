package com.netec.exams.security;

import java.util.Locale;
import org.springframework.security.core.AuthenticationException;

final class AuthFailureClassifier {
  private AuthFailureClassifier() {}

  static String classify(AuthenticationException exception) {
    StringBuilder details = new StringBuilder();
    Throwable current = exception;
    while (current != null) {
      if (current.getMessage() != null) details.append(' ').append(current.getMessage());
      current = current.getCause();
    }
    String message = details.toString().toLowerCase(Locale.ROOT);
    if (message.contains("issuer") || message.contains("iss claim")) return "ISSUER";
    if (message.contains("audience") || message.contains(" aud ")) return "AUDIENCE";
    if (message.contains("tenant") || message.contains(" tid ")) return "TENANT";
    if (message.contains("expired") || message.contains("exp claim")) return "EXPIRED";
    if (message.contains("signature") || message.contains("signed jwt")) return "SIGNATURE";
    if (message.contains("scope") || message.contains("insufficient_scope")) return "SCOPE";
    return "INVALID_TOKEN";
  }
}
