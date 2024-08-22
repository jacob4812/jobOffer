package pl.joboffer.job.features.offer;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
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

  @Override
  @Transactional
  public OfferEntity addJobOffer(Offer offer) {
    var savedOfferEntity = offerMapper.mapDtoToEntity(offer);
    System.out.println(offer);
    System.out.println(savedOfferEntity);
    try {
      var savedEntity = offerRepository.save(savedOfferEntity);
    } catch (Exception e) {
      throw new RuntimeException("nie da rady zapisac");
    }
    return savedOfferEntity;
  }

  @Override
  @Transactional
  public OfferEntity editJobOffer(Offer offer) {
    if (offer.id() == null) {
      throw new RuntimeException("Brak id dla wskazanej oferty");
    }
    var offerEntity = offerMapper.mapDtoToEntity(offer);
    try {
      var savedEntity = offerRepository.save(offerEntity);

    } catch (RuntimeException e) {
      throw e;
    }
    return offerEntity;
  }

  @Override
  @Transactional
  public OfferEntity deleteJobOffer(Long idOffer) {
    var offerEntity =
        offerRepository
            .findById(idOffer)
            .orElseThrow(() -> new RuntimeException("Brak ofert dla wskazanego id"));
    try {
      offerRepository.delete(offerEntity);
    } catch (RuntimeException e) {
      throw new RuntimeException("Usuwanie nie powiodlo sie");
    }

    return offerEntity;
  }
}
