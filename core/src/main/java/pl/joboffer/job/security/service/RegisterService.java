package pl.joboffer.job.security.service;

import pl.joboffer.job.dto.company.CompanyRegisterDetails;
import pl.joboffer.job.dto.user.UserRegisterDetails;

public interface RegisterService {

  void signup(UserRegisterDetails userRegisterDetails);

  void companySignup(CompanyRegisterDetails companyRegisterDetails);
}
