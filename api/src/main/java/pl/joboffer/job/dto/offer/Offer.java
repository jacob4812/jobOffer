package pl.joboffer.job.dto.offer;

import java.time.LocalDate;
import java.util.List;

import pl.joboffer.job.dto.company.CompanyDetails;
import pl.joboffer.job.enums.OfferExperience;
import pl.joboffer.job.enums.OfferPosition;
import pl.joboffer.job.enums.OfferTechnology;

import javax.validation.constraints.NotNull;

public record Offer(
    Long id,
    String title,
    String location,
    String contractType,
    double salary,
    LocalDate expirationDate,
    String description,
    CompanyDetails company,
    @NotNull List<OfferExperience> offerExperience,
    @NotNull List<OfferPosition> offerPosition,
    @NotNull List<OfferTechnology> offerTechnology
    ) {}
