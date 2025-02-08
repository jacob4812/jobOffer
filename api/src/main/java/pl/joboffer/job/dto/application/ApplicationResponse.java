package pl.joboffer.job.dto.application;

import pl.joboffer.job.enums.OfferStatus;

import java.time.LocalDateTime;

public record ApplicationResponse(
    String companyName,
    String position,
    String location,
    String email,
    String name,
    LocalDateTime applicationDate,
    OfferStatus status) {}
