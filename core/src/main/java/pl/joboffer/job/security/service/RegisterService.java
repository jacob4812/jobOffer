package pl.joboffer.job.security.service;

import pl.joboffer.job.dto.user.UserRegisterDetails;

public interface RegisterService {

  void signup(UserRegisterDetails userRegisterDetails);
}
