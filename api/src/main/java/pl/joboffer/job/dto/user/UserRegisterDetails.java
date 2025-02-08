package pl.joboffer.job.dto.user;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

public record UserRegisterDetails(
    @NotNull(message = "Id jest wymagane") Long id,
    @NotBlank String username,
    @NotBlank(message = "Email jest wymagany") @Email(message = "Email jest niepoprawny")
        String email,
    @Pattern(
            regexp = "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,25}",
            message =
                "Hasło musi zawierać przynajmniej 6 znaków, jedną dużą literę, jedną małą literę, jedną cyfrę i jeden znak specjalny")
        String password) {}
