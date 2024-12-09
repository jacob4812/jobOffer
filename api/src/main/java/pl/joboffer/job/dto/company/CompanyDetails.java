package pl.joboffer.job.dto.company;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import pl.joboffer.job.enums.UserRole;

public record CompanyDetails(
    Long id,
    @NotBlank String companyName,
    Long phoneNumber,
    @NotNull UserRole userRole,
    Long nip) {}
