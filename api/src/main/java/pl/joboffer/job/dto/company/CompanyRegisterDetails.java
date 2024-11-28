package pl.joboffer.job.dto.company;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public record CompanyRegisterDetails(@NotNull Long id, @NotBlank String companyName, @NotBlank String email, String password,@NotBlank Long nip) {
}
