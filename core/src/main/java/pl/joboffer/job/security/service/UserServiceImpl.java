package pl.joboffer.job.security.service;

import java.util.Optional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.joboffer.job.features.company.CompanyEntity;
import pl.joboffer.job.features.company.CompanyRepository;
import pl.joboffer.job.features.user.UserEntity;
import pl.joboffer.job.features.user.UserRepository;
import pl.joboffer.job.security.dto.JobUser;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final CompanyRepository companyRepository;

  @Override
  public JobUser loadUserByUsername(String email) throws UsernameNotFoundException {
    return mapEntityToUserDetails(
        findUserOrCompanyByEmail(email)
            .orElseThrow(
                () ->
                    new UsernameNotFoundException(
                        String.format("Nie znaleziono uzytkownika: %s", email))));
  }

  private Optional<?> findUserOrCompanyByEmail(String email) {
    Optional<?> user = userRepository.findByEmail(email);
    if (user.isPresent()) {
      return user;
    }
    return companyRepository.findByEmail(email);
  }

  private JobUser mapEntityToUserDetails(Object entity) {
    if (entity instanceof UserEntity) {
      return mapUserEntityToUserLoginDetails((UserEntity) entity);
    } else if (entity instanceof CompanyEntity) {
      return mapCompanyEntityToCompanyDetails((CompanyEntity) entity);
    }
    throw new IllegalArgumentException("Unexpected entity type");
  }

  private JobUser mapCompanyEntityToCompanyDetails(CompanyEntity entity) {
    if (entity == null) {
      throw new UsernameNotFoundException("Nie znaleziono firmy");
    }
    return new JobUser(
        entity.getEmail(), entity.getPassword(), entity.getId(), entity.getUserRole());
  }

  private JobUser mapUserEntityToUserLoginDetails(UserEntity userEntity) {
    if (userEntity == null) {
      throw new UsernameNotFoundException("Nie znaleziono uzytkownika");
    }
    return new JobUser(
        userEntity.getEmail(),
        userEntity.getPassword(),
        userEntity.getId(),
        userEntity.getUserRole());
  }
}
