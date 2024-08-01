package pl.joboffer.job.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum UserRole {
  ADMIN("Admin"),
  USER("User"),
  HR("Hr");
  private final String role;

  UserRole(String role) {
    this.role = role;
  }

  @JsonCreator
  public static UserRole fromRole(String role) {
    for (UserRole u : UserRole.values()) {
      if (u.getRole().equalsIgnoreCase(role)) {
        return u;
      }
    }
    throw new RuntimeException("Nieznana rola: " + role);
  }

  @JsonValue
  public String getRole() {
    return role;
  }
}
