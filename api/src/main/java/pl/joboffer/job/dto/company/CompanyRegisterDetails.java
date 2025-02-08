package pl.joboffer.job.dto.company;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

public record CompanyRegisterDetails(
    @NotNull(message = "Id jest wymagane") Long id,
    @NotBlank(message = "Nazwa firmy jest wymagane") String companyName,
    @NotBlank(message = "Email jest wymagany") @Email(message = "Email jest niepoprawny")
        String email,
    @Pattern(
            regexp = "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,25}",
            message =
                "Hasło musi zawierać przynajmniej 6 znaków, jedną dużą literę, jedną małą literę, jedną cyfrę i jeden znak specjalny")
        String password,
    @Pattern(regexp = "^\\d{10}$", message = "Numer nip musi składać się z 10 cyfr")
        @NotNull(message = "NIP jest wymagany")
        Long nip,
    @Pattern(regexp = "^\\d{9}$", message = "Numer telefonu musi składać się z 9 cyfr")
        Long phoneNumber) {}
