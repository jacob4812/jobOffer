package pl.joboffer.job.features.offer;

import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import pl.joboffer.job.dto.offer.Offer;

public interface OfferService {
  @NotNull
  Page<Offer> findAllJobOffers(PageRequest pageRequest);
}
