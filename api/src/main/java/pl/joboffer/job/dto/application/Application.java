package pl.joboffer.job.dto.application;

import javax.validation.constraints.NotBlank;
import pl.joboffer.job.enums.OfferStatus;

public record Application(
    @NotBlank Long userId,
    @NotBlank Long offerId,
    @NotBlank Long companyId,
    @NotBlank OfferStatus status) {}
