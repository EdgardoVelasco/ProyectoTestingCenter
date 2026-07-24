package com.netec.exams.security;

import org.springframework.security.oauth2.jwt.Jwt;

public final class IdentityClaims {
  private IdentityClaims() {}

  public static String userPrincipalName(Jwt jwt) {
    return firstPresent(jwt, "preferred_username", "upn", "email");
  }

  public static String firstPresent(Jwt jwt, String... names) {
    for (String name : names) {
      String value = jwt.getClaimAsString(name);
      if (value != null && !value.isBlank()) {
        return value;
      }
    }
    return "";
  }
}
