package pl.joboffer.job.features.user;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.joboffer.job.dto.user.UserDetails;
import pl.joboffer.job.dto.user.UserLoginDetails;

@Service
public class UserEntityServiceImpl implements UserEntityService {

  @Autowired private UserRepository userRepository;

  private PasswordEncoder passwordEncoder;

  public UserEntityServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public void registerUser(UserLoginDetails userLoginDetails, UserDetails userDetails) {
    UserEntity userEntity = new UserEntity();
    userEntity.setEmail(userLoginDetails.email());
    userEntity.setPassword(passwordEncoder.encode(userLoginDetails.password()));
    userEntity.setLogin(userDetails.login());
    userEntity.setPhoneNumber(userDetails.phoneNumber());
    userRepository.save(userEntity);
  }

  @Override
  public void editUser(UserLoginDetails userLoginDetails, UserDetails userDetails) {
    UserEntity userEntity =
        userRepository
            .findByEmail(userLoginDetails.email())
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (userDetails.login() != null) {
      userEntity.setLogin(userDetails.login());
    }
    if (userDetails.phoneNumber() != null) {
      userEntity.setPhoneNumber(userDetails.phoneNumber());
    }
    if (userLoginDetails.password() != null) {
      userEntity.setPassword(passwordEncoder.encode(userLoginDetails.password()));
    }

    userRepository.save(userEntity);
  }

  @Override
  public UserEntity findUserByEmail(String email) {
    return userRepository
        .findByEmailIgnoreCase(email)
        .orElseThrow(
            () ->
                new RuntimeException(
                    String.format("Nie znaleziono użytkownika o email: %s", email)));
  }

  @Override
  public List<UserDetails> findAllUsers() {
    return null;
  }
}
