package pl.joboffer.job.security.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.joboffer.job.dto.company.CompanyRegisterDetails;
import pl.joboffer.job.dto.user.UserRegisterDetails;
import pl.joboffer.job.enums.UserRole;
import pl.joboffer.job.features.company.CompanyMapper;
import pl.joboffer.job.features.company.CompanyRepository;
import pl.joboffer.job.features.company.ValidationServiceImpl;
import pl.joboffer.job.features.user.UserMapper;
import pl.joboffer.job.features.user.UserRepository;

@Service
@RequiredArgsConstructor
public class RegisterServiceImpl implements RegisterService {

  private final UserMapper userMapper;
  private final CompanyMapper companyMapper;
  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;
  private final CompanyRepository companyRepository;

  private final ValidationServiceImpl validationService;

  @Override
  @Transactional
  public void signup(UserRegisterDetails userRegisterDetails) {
    if (validationService.isEmailAlreadyInUse(userRegisterDetails.email())) {
      throw new RuntimeException("E-mail jest już używany przez innego użytkownika lub firmę.");
    }
    var userEntity = userMapper.mapDtoToEntity(userRegisterDetails);
    userEntity.setPassword(passwordEncoder.encode(userRegisterDetails.password()));
    userEntity.setUserRole(UserRole.valueOf("EMPLOYEE"));
    try {
      userRepository.save(userEntity);
    } catch (Exception e) {
      throw new RuntimeException("Zapis sie nie powiodl");
    }
  }

  @Override
  @Transactional
  public void companySignup(CompanyRegisterDetails companyRegisterDetails) {
    if (validationService.isEmailAlreadyInUse(companyRegisterDetails.email())) {
      throw new RuntimeException("E-mail jest już używany przez innego użytkownika lub firmę.");
    }
    var companyEntity = companyMapper.mapDtoToEntity(companyRegisterDetails);
    companyEntity.setPassword(passwordEncoder.encode(companyRegisterDetails.password()));
    companyEntity.setUserRole(UserRole.valueOf("COMPANY"));
    try {
      companyRepository.save(companyEntity);
    } catch (Exception e) {
      throw new RuntimeException("Zapis sie nie powiodl");
    }
  }
}
