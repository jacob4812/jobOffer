package pl.joboffer.job.features.offer;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import pl.joboffer.job.dto.Offer;

@Service
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class OfferServiceImpl implements OfferService {
  @NotNull OfferMapper offerMapper;
  @NotNull OfferRepository offerRepository;

  public OfferServiceImpl(
      OfferMapper offerMapper, OfferRepository offerRepository, ObjectMapper objectMapper) {
    this.offerMapper = offerMapper;
    this.offerRepository = offerRepository;
  }

  @Override
  public List<Offer> findAllJobOffers() {
    var offerEntity = offerRepository.findAll();
    return offerMapper.mapListEntityToDto(offerEntity);
  }
}
