package pl.joboffer.job.features.company;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.joboffer.job.features.user.UserRepository;

@Service
public class ValidationServiceImpl {
  @Autowired private UserRepository userRepository;

  @Autowired private CompanyRepository companyRepository;

  public boolean isEmailAlreadyInUse(String email) {

    boolean userExists = userRepository.existsByEmail(email);

    boolean companyExists = companyRepository.existsByEmail(email);

    return userExists || companyExists;
  }

  public boolean isEmailUsedByUser(String email) {
    return userRepository.existsByEmail(email);
  }
}
