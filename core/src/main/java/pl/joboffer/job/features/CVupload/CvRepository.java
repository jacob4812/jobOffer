package pl.joboffer.job.features.CVupload;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CvRepository extends JpaRepository<CvEntity, Long> {

  Optional<CvEntity> findById(Long id);

  @Query("SELECT c FROM CvEntity c WHERE c.user.id = :userId")
  Optional<CvEntity> findByUserId(@Param("userId") Long userId);
}
