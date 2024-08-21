package pl.joboffer.job.features.offer;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import pl.joboffer.job.dto.offer.Offer;

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
  public Page<Offer> findAllJobOffers(PageRequest pageRequest) {
    Page<OfferEntity> offerPage = offerRepository.findAll(pageRequest);
    List<Offer> offers = offerMapper.mapListEntityToDto(offerPage.getContent());
    return new PageImpl<>(offers, pageRequest, offerPage.getTotalElements());
  }
}
