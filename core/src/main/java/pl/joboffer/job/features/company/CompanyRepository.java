package pl.joboffer.job.features.company;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<CompanyEntity, Long> {
  Optional<CompanyEntity> findByEmail(String email);

  Optional<CompanyEntity> findCompanyById(Long userId);

  boolean existsByEmail(String email);
}
