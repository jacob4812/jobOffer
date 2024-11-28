package pl.joboffer.job.security.service;

import org.springframework.validation.annotation.Validated;
import pl.joboffer.job.dto.user.UserLoginDetails;

@Validated
public interface LoginService {

  String login(UserLoginDetails userLoginDetails);
}
