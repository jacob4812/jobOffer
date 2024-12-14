package pl.joboffer.job.dto.application;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record ApplicationResponse(
        String companyName, String position, String location, String email, String name, LocalDateTime applicationDate, String status) {}
