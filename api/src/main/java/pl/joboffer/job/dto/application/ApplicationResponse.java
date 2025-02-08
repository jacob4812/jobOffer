package pl.joboffer.job.dto.application;

import java.time.LocalDateTime;
import pl.joboffer.job.enums.OfferStatus;

public record ApplicationResponse(
    Long id,
    String companyName,
    String position,
    String location,
    String email,
    String name,
    LocalDateTime applicationDate,
    OfferStatus status) {}
