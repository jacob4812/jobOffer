package pl.joboffer.job.enums;

public enum UserRole {
  ADMIN("Admin"),
  COMPANY("Company"),
  EMPLOYEE("Employee"),
  HR("Hr");
  private final String role;

  UserRole(String role) {
    this.role = role;
  }
}
