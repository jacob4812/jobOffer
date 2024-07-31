package pl.joboffer.job.features.offer;

import jakarta.validation.constraints.NotNull;
import pl.joboffer.job.dto.Offer;

public class OfferServiceImpl implements OfferService {
  @NotNull OfferMapper offerMapper;
  @NotNull OfferRepository offerRepository;

  @Override
  public Offer findAllJobOffers() {
    try {
      var offerEntity = offerRepository.readAllBy();

      return offerMapper.mapEntityToDto(offerEntity);
    } catch (Exception e) {
      throw new RuntimeException();
    }
  }
}
