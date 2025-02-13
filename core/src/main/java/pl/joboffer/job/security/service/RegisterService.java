package pl.joboffer.job.security.service;

import pl.joboffer.job.dto.company.CompanyRegisterDetails;
import pl.joboffer.job.dto.registerResponse.RegistrationResponse;
import pl.joboffer.job.dto.user.UserRegisterDetails;

public interface RegisterService {

  RegistrationResponse signup(UserRegisterDetails userRegisterDetails);

  RegistrationResponse companySignup(CompanyRegisterDetails companyRegisterDetails);
}
