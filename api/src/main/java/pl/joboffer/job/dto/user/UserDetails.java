package pl.joboffer.job.dto.user;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import pl.joboffer.job.enums.UserRole;

public record UserDetails(
    Long id, @NotBlank String login, Long phoneNumber, @NotNull UserRole userRole) {}
