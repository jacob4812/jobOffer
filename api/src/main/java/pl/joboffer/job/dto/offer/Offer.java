package pl.joboffer.job.dto.offer;

import java.time.LocalDate;
import pl.joboffer.job.dto.company.CompanyDetails;

public record Offer(
    Long id,
    String title,
    String location,
    String contractType,
    double salary,
    LocalDate expirationDate,
    String description,
    CompanyDetails company) {}
