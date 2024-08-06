package pl.joboffer.job.features.offer;

import java.util.List;
import org.antlr.v4.runtime.misc.NotNull;
import pl.joboffer.job.dto.offer.Offer;

public interface OfferService {
  @NotNull
  List<Offer> findAllJobOffers();
}
