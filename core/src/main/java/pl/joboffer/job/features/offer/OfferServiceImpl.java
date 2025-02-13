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
import pl.joboffer.job.enums.OfferExperience;
import pl.joboffer.job.enums.OfferPosition;
import pl.joboffer.job.enums.OfferTechnology;

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
    if (offer.offerExperience() == null || offer.offerExperience().isEmpty()) {
      throw new IllegalArgumentException("Offer experience cannot be null or empty");
    }
    try {
      var savedEntity = offerRepository.save(savedOfferEntity);
    } catch (Exception e) {
      throw new RuntimeException("nie da rady zapisac");
    }
    return savedOfferEntity;
  }

  @Override
  public Page<Offer> findJobsOfferById(Long userId, PageRequest pageRequest) {
    Page<OfferEntity> offerPage = offerRepository.findOfferByCompanyId(userId, pageRequest);
    List<Offer> offers = offerMapper.mapListEntityToDto(offerPage.getContent());
    return new PageImpl<>(offers, pageRequest, offerPage.getTotalElements());
  }

  @Override
  public Page<Offer> searchJobOffers(
      String description, String location, Double salaryMin, PageRequest pageRequest) {
    Page<OfferEntity> offerPage;

    if (salaryMin == null) {
      salaryMin = 0.0;
    }

    if (description != null && location != null && salaryMin != 0.0) {
      offerPage =
          offerRepository.findByDescriptionAndLocationAndSalaryMin(
              description, location, salaryMin, pageRequest);
    } else if (description != null && location != null) {
      offerPage = offerRepository.findByDescriptionAndLocation(description, location, pageRequest);
    } else if (description != null && salaryMin != 0.0) {
      offerPage =
          offerRepository.findByDescriptionAndSalaryMin(description, salaryMin, pageRequest);
    } else if (location != null && salaryMin != 0.0) {
      offerPage = offerRepository.findByLocationAndSalaryMin(location, salaryMin, pageRequest);
    } else if (description != null) {
      offerPage = offerRepository.findByDescription(description, pageRequest);
    } else if (location != null) {
      offerPage = offerRepository.findByLocation(location, pageRequest);
    } else if (salaryMin != 0.0) {
      offerPage = offerRepository.findBySalaryMinGreaterThanEqual(salaryMin, pageRequest);
    } else {
      offerPage = offerRepository.findAll(pageRequest);
    }

    List<Offer> offers = offerMapper.mapListEntityToDto(offerPage.getContent());

    return new PageImpl<>(offers, pageRequest, offerPage.getTotalElements());
  }

  @Override
  public Page<Offer> filterJobOffers(
      List<OfferExperience> offerExperiences, PageRequest pageRequest) {
    if (offerExperiences == null || offerExperiences.isEmpty()) {

      Page<OfferEntity> offerPage = offerRepository.findAll(pageRequest);
      List<Offer> offers = offerMapper.mapListEntityToDto(offerPage.getContent());
      return new PageImpl<>(offers, pageRequest, offerPage.getTotalElements());
    }

    Page<OfferEntity> offerPage =
        offerRepository.findByOfferExperience(offerExperiences, pageRequest);
    List<Offer> offers = offerMapper.mapListEntityToDto(offerPage.getContent());
    return new PageImpl<>(offers, pageRequest, offerPage.getTotalElements());
  }

  @Override
  public Page<Offer> filterJobOffersByPosition(
      List<OfferPosition> offerPositions, PageRequest pageRequest) {
    if (offerPositions == null || offerPositions.isEmpty()) {

      Page<OfferEntity> offerPage = offerRepository.findAll(pageRequest);
      List<Offer> offers = offerMapper.mapListEntityToDto(offerPage.getContent());
      return new PageImpl<>(offers, pageRequest, offerPage.getTotalElements());
    }

    Page<OfferEntity> offerPage = offerRepository.findByOfferPosition(offerPositions, pageRequest);
    List<Offer> offers = offerMapper.mapListEntityToDto(offerPage.getContent());
    return new PageImpl<>(offers, pageRequest, offerPage.getTotalElements());
  }

  @Override
  public Page<Offer> filterJobOffersByTechnology(
      List<OfferTechnology> offerTechnologies, PageRequest pageRequest) {
    if (offerTechnologies == null || offerTechnologies.isEmpty()) {

      Page<OfferEntity> offerPage = offerRepository.findAll(pageRequest);
      List<Offer> offers = offerMapper.mapListEntityToDto(offerPage.getContent());
      return new PageImpl<>(offers, pageRequest, offerPage.getTotalElements());
    }

    Page<OfferEntity> offerPage =
        offerRepository.findByOfferTechnology(offerTechnologies, pageRequest);
    List<Offer> offers = offerMapper.mapListEntityToDto(offerPage.getContent());
    return new PageImpl<>(offers, pageRequest, offerPage.getTotalElements());
  }

  @Override
  @Transactional
  public OfferEntity editJobOffer(Offer offer) {
    if (offer.offerExperience() == null || offer.offerExperience().isEmpty()) {
      throw new IllegalArgumentException("Offer experience cannot be null or empty");
    }
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
