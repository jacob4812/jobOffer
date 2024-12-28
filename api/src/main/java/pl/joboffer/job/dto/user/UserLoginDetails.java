package pl.joboffer.job.dto.user;

import javax.validation.constraints.NotNull;

public record UserLoginDetails(
    @NotNull String email, String password, String username, Long phoneNumber) {}
