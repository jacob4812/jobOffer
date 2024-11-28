package pl.joboffer.job.dto.company;

import javax.validation.constraints.NotNull;

public record CompanyLoginDetails(@NotNull String email, String password) {
}
