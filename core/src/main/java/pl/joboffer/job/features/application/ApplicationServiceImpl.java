package pl.joboffer.job.features.application;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import pl.joboffer.job.dto.application.Application;
import pl.joboffer.job.dto.application.ApplicationResponse;
import pl.joboffer.job.features.offer.OfferEntity;
import pl.joboffer.job.features.offer.OfferRepository;
import pl.joboffer.job.features.user.UserEntity;
import pl.joboffer.job.features.user.UserRepository;

@Service
public class ApplicationServiceImpl implements ApplicationService {

  @Autowired private ApplicationRepository applicationRepository;
  private UserRepository userRepository;
  private OfferRepository offerRepository;

  public ApplicationServiceImpl(
      UserRepository userRepository,
      OfferRepository offerRepository,
      ApplicationRepository applicationRepository) {
    this.userRepository = userRepository;
    this.offerRepository = offerRepository;
    this.applicationRepository = applicationRepository;
  }

  @Override
  public void apply(Application request) {
    UserEntity user =
        userRepository
            .findById(request.userId())
            .orElseThrow(() -> new RuntimeException("User not found"));
    OfferEntity offer =
        offerRepository
            .findById(request.offerId())
            .orElseThrow(() -> new RuntimeException("Offer not found"));

    ApplicationEntity application = new ApplicationEntity();
    application.setUser(user);
    application.setOffer(offer);
    application.setApplicationDate(LocalDateTime.now());

    applicationRepository.save(application);
  }

  @Override
  public Page<ApplicationResponse> getApplicationsByUserId(Long userId, PageRequest pageRequest) {
    Page<ApplicationEntity> applications = applicationRepository.findByUserId(userId, pageRequest);

    List<ApplicationResponse> applicationResponses =
        applications.getContent().stream()
            .map(
                app ->
                    new ApplicationResponse(
                        app.getOffer().getCompany().getCompanyName(),
                        app.getOffer().getTitle(),
                        app.getOffer().getLocation(),
                        "In Progress"))
            .collect(Collectors.toList());

    return new PageImpl<>(applicationResponses, pageRequest, applications.getTotalElements());
  }
}
