package pl.joboffer.job.dto.user;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public record UserRegisterDetails(
    @NotNull Long id, @NotBlank String username, @NotBlank String email, String password) {}
