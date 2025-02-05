package pl.joboffer.job.dto.offer;

import java.time.LocalDate;
import java.util.List;

import pl.joboffer.job.dto.company.CompanyDetails;
import pl.joboffer.job.enums.OfferExperience;

import javax.validation.constraints.NotEmpty;
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
    @NotNull List<OfferExperience> offerExperience) {}
