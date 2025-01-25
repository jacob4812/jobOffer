package pl.joboffer.job.features.user;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.stereotype.Service;
import pl.joboffer.job.dto.company.CompanyDetails;
import pl.joboffer.job.dto.user.UserDetails;
import pl.joboffer.job.dto.user.UserLoginDetails;

@Service
public interface UserEntityService {
  void registerUser(@Valid UserLoginDetails userLoginDetails, UserDetails userDetails);

  void editUser(@Valid UserDetails userDetails);

  UserEntity findUserByEmail(String email);

  UserDetails readUserDetails(Long userId);

  List<UserDetails> findAllUsers();
}
