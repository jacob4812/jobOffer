package pl.joboffer.job.dto.company;

import pl.joboffer.job.enums.UserRole;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public record CompanyDetails(Long id, @NotBlank String companyName, Long phoneNumber, @NotNull UserRole userRole) {
}
