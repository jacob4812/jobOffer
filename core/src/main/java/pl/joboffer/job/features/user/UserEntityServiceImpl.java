package pl.joboffer.job.features.user;

import jakarta.persistence.EntityNotFoundException;
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
  private final UserMapper userMapper;

  public UserEntityServiceImpl(
      UserRepository userRepository, PasswordEncoder passwordEncoder, UserMapper userMapper) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.userMapper = userMapper;
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
  public void editUser(UserDetails userDetails) {
    UserEntity existingUser =
        userRepository
            .findById(userDetails.id())
            .orElseThrow(
                () ->
                    new EntityNotFoundException("User with ID " + userDetails.id() + " not found"));

    if (userDetails.login() != null) {
      existingUser.setLogin(userDetails.login());
    }
    if (userDetails.phoneNumber() != null) {
      existingUser.setPhoneNumber(userDetails.phoneNumber());
    }
    if (userDetails.userRole() != null) {
      existingUser.setUserRole(userDetails.userRole());
    }
    if (userDetails.name() != null) {
      existingUser.setName(userDetails.name());
    }
    if (userDetails.surname() != null) {
      existingUser.setSurname(userDetails.surname());
    }

    UserEntity savedEntity = userRepository.save(existingUser);
  }

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
  public UserDetails readUserDetails(Long userId) {
    return userMapper.mapEntityToUserDetailsDto(
        userRepository
            .findUserById(userId)
            .orElseThrow(
                () ->
                    new RuntimeException(
                        String.format("Nie znaleziono uzytkownika o podanym id: %s", userId))));
  }

  @Override
  public List<UserDetails> findAllUsers() {
    return null;
  }
}
