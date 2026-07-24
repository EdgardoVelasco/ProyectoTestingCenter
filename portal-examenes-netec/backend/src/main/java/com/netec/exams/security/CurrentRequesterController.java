package com.netec.exams.security;

import java.util.Arrays;
import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/me")
public class CurrentRequesterController {

  @GetMapping
  AuthenticatedIdentity me(Authentication authentication) {
    Object principal = authentication.getPrincipal();
    if (principal instanceof LocalPrincipal local) {
      return new AuthenticatedIdentity(
          local.id(),
          null,
          local.name(),
          local.email(),
          "00000000-0000-0000-0000-000000000000",
          List.of("ExamRequests.Access"),
          List.of("EXAM_SALES"),
          blankToNull(local.area()),
          blankToNull(local.businessUnit()));
    }

    Jwt jwt = (Jwt) principal;
    return new AuthenticatedIdentity(
        jwt.getSubject(),
        claim(jwt, "oid", null),
        claim(jwt, "name", "Usuario"),
        IdentityClaims.userPrincipalName(jwt),
        claim(jwt, "tid", ""),
        splitScopes(jwt.getClaimAsString("scp")),
        listClaim(jwt, "roles"),
        blankToNull(claim(jwt, "department", null)),
        blankToNull(claim(jwt, "extension_businessUnit", null)));
  }

  private static String claim(Jwt jwt, String name, String fallback) {
    String value = jwt.getClaimAsString(name);
    return value == null || value.isBlank() ? fallback : value;
  }

  private static List<String> listClaim(Jwt jwt, String name) {
    List<String> values = jwt.getClaimAsStringList(name);
    return values == null ? List.of() : List.copyOf(values);
  }

  private static List<String> splitScopes(String scopes) {
    return scopes == null || scopes.isBlank()
        ? List.of()
        : Arrays.stream(scopes.trim().split("\\s+")).toList();
  }

  private static String blankToNull(String value) {
    return value == null || value.isBlank() ? null : value;
  }
}

record AuthenticatedIdentity(
    String subject,
    String objectId,
    String name,
    String username,
    String tenantId,
    List<String> scopes,
    List<String> roles,
    String area,
    String businessUnit) {}
