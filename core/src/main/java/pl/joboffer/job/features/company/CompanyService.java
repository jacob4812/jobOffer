package pl.joboffer.job.features.company;

import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import pl.joboffer.job.dto.company.CompanyDetails;
import pl.joboffer.job.dto.company.CompanyLoginDetails;
import pl.joboffer.job.dto.user.UserDetails;
import pl.joboffer.job.dto.user.UserLoginDetails;
import pl.joboffer.job.features.user.UserEntity;
import pl.joboffer.job.security.dto.CompanyUser;

import java.util.List;
@Service
public interface CompanyService {
    void registerCompany(@Valid CompanyLoginDetails companyLoginDetails, CompanyDetails companyDetails);

    void editUser(@Valid CompanyLoginDetails companyLoginDetails);

    CompanyUser findUserByEmail(String email);

    List<UserDetails> findAllUsers();
}
