package pl.joboffer.job.features.user;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.joboffer.job.features.company.CompanyEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
  Optional<UserEntity> findByEmail(String email);
  Optional<UserEntity> findUserById(Long userId);
}
