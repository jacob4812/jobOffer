package pl.joboffer.job.features.company;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.joboffer.job.dto.company.CompanyDetails;
import pl.joboffer.job.dto.company.CompanyLoginDetails;
import pl.joboffer.job.dto.offer.Offer;
import pl.joboffer.job.dto.user.UserDetails;
import pl.joboffer.job.features.offer.OfferMapper;
import pl.joboffer.job.features.offer.OfferRepository;
import pl.joboffer.job.security.dto.CompanyUser;

@Service
public class CompanyServiceImpl implements CompanyService {
  @Autowired private CompanyRepository companyRepository;
  private final OfferRepository offerRepository;
  private PasswordEncoder passwordEncoder;
  private final OfferMapper offerMapper;

  public CompanyServiceImpl(
      CompanyRepository companyRepository,
      OfferRepository offerRepository,
      PasswordEncoder passwordEncoder,
      OfferMapper offerMapper) {
    this.companyRepository = companyRepository;
    this.offerRepository = offerRepository;
    this.passwordEncoder = passwordEncoder;
    this.offerMapper = offerMapper;
  }

  @Override
  public void registerCompany(
      CompanyLoginDetails companyLoginDetails, CompanyDetails companyDetails) {
    CompanyEntity companyEntity = new CompanyEntity();
    companyEntity.setEmail(companyLoginDetails.email());
    companyEntity.setPassword(companyLoginDetails.password());
    companyEntity.setCompanyName(companyDetails.companyName());

    companyRepository.save(companyEntity);
  }

  @Override
  public void editUser(CompanyLoginDetails companyLoginDetails) {}

  @Override
  public CompanyUser findUserByEmail(String email) throws UsernameNotFoundException {
    return mapCompanyEntityToCompanyDetails(
        companyRepository
            .findByEmail(email)
            .orElseThrow(
                () ->
                    new RuntimeException(
                        String.format("Nie znaleziono uzytkownika o email: %s", email))));
  }

  @Override
  public List<UserDetails> findAllUsers() {
    return null;
  }

  public List<Offer> findOffersByCompanyId(Long companyId) {
    CompanyEntity companyEntity =
        companyRepository
            .findById(companyId)
            .orElseThrow(
                () ->
                    new RuntimeException(
                        String.format("Nie znaleziono firmy o ID: %s", companyId)));

    return offerRepository.findByCompanyId(companyId).stream()
        .map(offerMapper::mapEntityToDto)
        .collect(Collectors.toList());
  }

  private CompanyUser mapCompanyEntityToCompanyDetails(CompanyEntity companyEntity) {
    if (companyEntity == null) {
      throw new UsernameNotFoundException("Nie znaleziono uzytkownika");
    }
    return new CompanyUser(
        companyEntity.getEmail(),
        companyEntity.getPassword(),
        companyEntity.getId(),
        companyEntity.getUserRole());
  }
}