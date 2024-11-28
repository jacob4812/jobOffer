package pl.joboffer.job.enums;

public enum UserRole {
  ADMIN("Admin"),
  COMPANY("Company"),
  USER("User");
  private final String role;

  UserRole(String role) {
    this.role = role;
  }
}
