package pl.joboffer.job.dto.web;

import javax.validation.constraints.NotEmpty;

public record JwtToken(@NotEmpty String tokenContent) {}
