package pl.joboffer.job.dto.application;

public record ApplicationResponse(
    String companyName, String position, String location, String status) {}
