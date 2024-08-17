package pl.joboffer.job.security.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.joboffer.job.features.user.UserEntity;
import pl.joboffer.job.features.user.UserRepository;
import pl.joboffer.job.security.dto.JobUser;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;

  @Override
  public JobUser loadUserByUsername(String email) throws UsernameNotFoundException {
    return mapUserEntityToUserDetails(
        userRepository
            .findByEmail(email)
            .orElseThrow(
                () ->
                    new UsernameNotFoundException(
                        String.format("Nie znaleziono uzytkownika: %s", email))));
  }

  private JobUser mapUserEntityToUserDetails(UserEntity userEntity) {
    if (userEntity == null) {
      throw new UsernameNotFoundException("Nie znaleziono uzytkownika");
    }
    return new JobUser(
        userEntity.getEmail(),
        userEntity.getPassword(),
        userEntity.getId(),
        userEntity.getUserRole());
  }

  //    @Override
  //    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
  //        return null;
  //    }
}
