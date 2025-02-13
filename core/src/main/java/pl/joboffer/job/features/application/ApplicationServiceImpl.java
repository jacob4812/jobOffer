package pl.joboffer.job.features.application;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import java.io.IOException;
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
import pl.joboffer.job.enums.OfferStatus;
import pl.joboffer.job.enums.UserRole;
import pl.joboffer.job.features.company.CompanyEntity;
import pl.joboffer.job.features.company.CompanyRepository;
import pl.joboffer.job.features.offer.OfferEntity;
import pl.joboffer.job.features.offer.OfferRepository;
import pl.joboffer.job.features.user.UserEntity;
import pl.joboffer.job.features.user.UserRepository;

@Service
public class ApplicationServiceImpl implements ApplicationService {

  @Autowired private ApplicationRepository applicationRepository;
  private UserRepository userRepository;
  private OfferRepository offerRepository;
  private CompanyRepository companyRepository;

  public ApplicationServiceImpl(
      UserRepository userRepository,
      OfferRepository offerRepository,
      ApplicationRepository applicationRepository,
      CompanyRepository companyRepository) {
    this.userRepository = userRepository;
    this.offerRepository = offerRepository;
    this.applicationRepository = applicationRepository;
    this.companyRepository = companyRepository;
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
    CompanyEntity company =
        companyRepository
            .findById(request.companyId())
            .orElseThrow(() -> new RuntimeException("Company not found"));

    ApplicationEntity application = new ApplicationEntity();
    application.setUser(user);
    application.setOffer(offer);
    application.setCompany(company);
    application.setApplicationDate(LocalDateTime.now());
    application.setStatus(OfferStatus.IN_PROGRESS);
    try {
      if (request.file() != null && !request.file().isEmpty()) {
        application.setData(request.file().getBytes()); // Zapisanie danych pliku CV
        application.setFileName(request.file().getOriginalFilename()); // Zapisanie nazwy pliku CV
        application.setFileType(request.file().getContentType()); // Zapisanie typu pliku CV
      }
    } catch (IOException e) {
      throw new RuntimeException("Błąd zapisu pliku CV", e);
    }
    applicationRepository.save(application);
  }

  @Override
  @Transactional
  public Page<ApplicationResponse> getApplicationsByType(
      Long id, UserRole type, PageRequest pageRequest) {
    Page<ApplicationEntity> applications;

    if (type == UserRole.COMPANY) {
      applications = applicationRepository.findByCompanyId(id, pageRequest);
    } else if (type == UserRole.EMPLOYEE) {
      applications = applicationRepository.findByUserId(id, pageRequest);
    } else {
      throw new IllegalArgumentException("Nieobsługiwany typ wyszukiwania aplikacji");
    }

    List<ApplicationResponse> applicationResponses =
        applications.getContent().stream()
            .map(
                app ->
                    new ApplicationResponse(
                        app.getId(),
                        app.getOffer().getCompany().getCompanyName(),
                        app.getOffer().getTitle(),
                        app.getOffer().getLocation(),
                        app.getUser().getEmail(),
                        app.getUser().getLogin(),
                        app.getApplicationDate(),
                        app.getStatus(),
                        app.getFileName()))
            .collect(Collectors.toList());

    return new PageImpl<>(applicationResponses, pageRequest, applications.getTotalElements());
  }

  @Transactional
  @Override
  public void updateApplicationStatus(Long applicationId, OfferStatus newStatus) {
    ApplicationEntity application =
        applicationRepository
            .findById(applicationId)
            .orElseThrow(
                () ->
                    new EntityNotFoundException("Application not found with ID: " + applicationId));

    application.setStatus(newStatus);
    applicationRepository.save(application);
  }
}
