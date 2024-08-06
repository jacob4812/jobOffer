package pl.joboffer.job.features.user;

import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import pl.joboffer.job.dto.user.UserDetails;
import pl.joboffer.job.dto.user.UserLoginDetails;

import java.util.List;

@Service
public interface UserService {
    void registerUser(@Valid UserLoginDetails userLoginDetails,UserDetails userDetails);
    void editUser(@Valid UserLoginDetails userLoginDetails);
    UserEntity findUserByEmail(String email);
    List<UserDetails> findAllUsers();
}
