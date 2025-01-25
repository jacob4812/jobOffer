package pl.joboffer.job.features.CVupload;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.joboffer.job.features.user.UserEntity;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CvRepository extends JpaRepository<CvEntity, Long> {

    Optional<CvEntity> findById(Long id);
}
