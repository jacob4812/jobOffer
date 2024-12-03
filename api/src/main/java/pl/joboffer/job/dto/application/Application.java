package pl.joboffer.job.dto.application;

import javax.validation.constraints.NotBlank;

public record Application(@NotBlank Long userId, @NotBlank Long offerId) {}
