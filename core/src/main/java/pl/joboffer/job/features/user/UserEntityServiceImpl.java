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
    userEntity.setPassword(userLoginDetails.password());
    userEntity.setLogin(userDetails.login());

    userRepository.save(userEntity);
  }

  @Override
  public void editUser(UserLoginDetails userLoginDetails) {}

  @Override
  public UserEntity findUserByEmail(String email) {
    return userRepository
        .findByEmail(email)
        .orElseThrow(
            () ->
                new RuntimeException(
                    String.format("Nie znaleziono uzytkownika o email: %s", email)));
  }

  @Override
  public List<UserDetails> findAllUsers() {
    return null;
  }
}
