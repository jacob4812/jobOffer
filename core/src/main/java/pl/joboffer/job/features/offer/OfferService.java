package pl.joboffer.job.features.offer;

import org.antlr.v4.runtime.misc.NotNull;
import pl.joboffer.job.dto.Offer;

public interface OfferService {
  @NotNull
  Offer findAllJobOffers();
}
