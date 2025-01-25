package pl.joboffer.job.features.company;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.stereotype.Service;
import pl.joboffer.job.dto.company.CompanyDetails;
import pl.joboffer.job.dto.company.CompanyLoginDetails;
import pl.joboffer.job.dto.user.UserDetails;
import pl.joboffer.job.security.dto.CompanyUser;

@Service
public interface CompanyService {
  void registerCompany(
      @Valid CompanyLoginDetails companyLoginDetails, CompanyDetails companyDetails);


  void editCompanyData(@Valid CompanyDetails companyDetails);

  CompanyUser findUserByEmail(String email);

  CompanyDetails readCompanyData(Long userId);

  List<UserDetails> findAllUsers();

 
}
