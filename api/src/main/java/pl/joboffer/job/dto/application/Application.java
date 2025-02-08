package pl.joboffer.job.dto.application;

import pl.joboffer.job.enums.OfferStatus;

import javax.validation.constraints.NotBlank;

public record Application(@NotBlank Long userId, @NotBlank Long offerId, @NotBlank Long companyId, @NotBlank
                          OfferStatus status) {}
