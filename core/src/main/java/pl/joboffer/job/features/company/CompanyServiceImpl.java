package pl.joboffer.job.features.company;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.joboffer.job.dto.company.CompanyDetails;
import pl.joboffer.job.dto.company.CompanyLoginDetails;
import pl.joboffer.job.dto.user.UserDetails;
import pl.joboffer.job.dto.user.UserLoginDetails;
import pl.joboffer.job.features.user.UserEntity;
import pl.joboffer.job.features.user.UserRepository;
import pl.joboffer.job.security.dto.CompanyUser;
import pl.joboffer.job.security.dto.JobUser;

import java.util.List;

@Service
public class CompanyServiceImpl implements CompanyService {
    @Autowired
    private CompanyRepository companyRepository;
    private PasswordEncoder passwordEncoder;

    public CompanyServiceImpl(CompanyRepository companyRepository, PasswordEncoder passwordEncoder) {
        this.companyRepository = companyRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void registerCompany(CompanyLoginDetails companyLoginDetails, CompanyDetails companyDetails) {
        CompanyEntity companyEntity = new CompanyEntity();
        companyEntity.setEmail(companyLoginDetails.email());
        companyEntity.setPassword(companyLoginDetails.password());
        companyEntity.setCompanyName(companyDetails.companyName());

        companyRepository.save(companyEntity);
    }

    @Override
    public void editUser(CompanyLoginDetails companyLoginDetails) {}

    @Override
    public CompanyUser findUserByEmail(String email) throws UsernameNotFoundException {
        return mapCompanyEntityToCompanyDetails(
                companyRepository
                .findByEmail(email)
                .orElseThrow(
                        () ->
                                new RuntimeException(
                                        String.format("Nie znaleziono uzytkownika o email: %s", email))));
    }

    @Override
    public List<UserDetails> findAllUsers() {
        return null;
    }

    private CompanyUser mapCompanyEntityToCompanyDetails(CompanyEntity companyEntity) {
        if (companyEntity == null) {
            throw new UsernameNotFoundException("Nie znaleziono uzytkownika");
        }
        return new CompanyUser(
                companyEntity.getEmail(),
                companyEntity.getPassword(),
                companyEntity.getId(),
                companyEntity.getUserRole());
    }
}
