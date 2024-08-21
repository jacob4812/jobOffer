package pl.joboffer.job.dto.offer;

import java.time.LocalDate;

public record Offer(
    Long id,
    String company,
    String title,
    String location,
    String contractType,
    double salary,
    LocalDate expirationDate,
    String description) {}
