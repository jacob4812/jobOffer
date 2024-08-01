package pl.joboffer.job.features.offer;

import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import org.springframework.stereotype.Service;
import pl.joboffer.job.dto.Offer;

@Service
public class OfferServiceImpl implements OfferService {
  @NotNull OfferMapper offerMapper;
  @NotNull OfferRepository offerRepository;

  public OfferServiceImpl(OfferMapper offerMapper, OfferRepository offerRepository) {
    this.offerMapper = offerMapper;
    this.offerRepository = offerRepository;
  }

  @Override
  @Transactional
  public Offer findAllJobOffers() {
    try {
      var offerEntity = offerRepository.readAllBy();

      return offerMapper.mapEntityToDto(offerEntity);
    } catch (Exception e) {
      throw new RuntimeException();
    }
  }
}
