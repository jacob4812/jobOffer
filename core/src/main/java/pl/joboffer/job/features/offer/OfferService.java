package pl.joboffer.job.features.offer;

import org.springframework.validation.annotation.Validated;
import pl.joboffer.job.dto.Offer;

@Validated
public interface OfferService {

  Offer findAllJobOffers();
}
