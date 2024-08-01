package pl.joboffer.job.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import pl.joboffer.job.enums.UserRole;

public record User(Long id, @NotBlank String Login, @NotNull UserRole userRole, boolean isActive) {}
