package pl.joboffer.job.features.offer;

import java.util.List;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import pl.joboffer.job.dto.offer.Offer;
import pl.joboffer.job.enums.OfferExperience;
import pl.joboffer.job.enums.OfferPosition;
import pl.joboffer.job.enums.OfferTechnology;

public interface OfferService {
  @NotNull
  Page<Offer> findAllJobOffers(PageRequest pageRequest);

  @NotNull
  OfferEntity addJobOffer(Offer offer);

  @NotNull
  OfferEntity editJobOffer(Offer offer);

  @NotNull
  OfferEntity deleteJobOffer(Long idOffer);

  @NotNull
  Page<Offer> findJobsOfferById(Long userId, PageRequest pageRequest);

  Page<Offer> searchJobOffers(
      String description, String location, Double salary, PageRequest pageRequest);

  Page<Offer> filterJobOffers(List<OfferExperience> offerExperience, PageRequest pageRequest);

  Page<Offer> filterJobOffersByPosition(List<OfferPosition> offerPosition, PageRequest pageRequest);

  Page<Offer> filterJobOffersByTechnology(
      List<OfferTechnology> offerTechnology, PageRequest pageRequest);
}
