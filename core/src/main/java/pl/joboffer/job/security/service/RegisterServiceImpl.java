package pl.joboffer.job.security.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.joboffer.job.dto.user.UserRegisterDetails;
import pl.joboffer.job.enums.UserRole;
import pl.joboffer.job.features.user.UserMapper;
import pl.joboffer.job.features.user.UserRepository;

@Service
@RequiredArgsConstructor
public class RegisterServiceImpl implements RegisterService {

  private final UserMapper userMapper;
  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;

  @Override
  @Transactional
  public void signup(UserRegisterDetails userRegisterDetails) {
    var userEntity = userMapper.mapDtoToEntity(userRegisterDetails);
    userEntity.setPassword(passwordEncoder.encode(userRegisterDetails.password()));
    userEntity.setUserRole(UserRole.valueOf("ADMIN"));
    try {
      userRepository.save(userEntity);
    } catch (Exception e) {
      throw new RuntimeException("Zapis sie nie powiodl");
    }
  }
}
