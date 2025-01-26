package pl.joboffer.job.features.CVupload;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;

@Repository
public interface CvRepository extends JpaRepository<CvEntity, Long> {

    Optional<CvEntity> findById(Long id);

    @Query("SELECT c FROM CvEntity c WHERE c.user.id = :userId")
    Optional<CvEntity> findByUserId(@Param("userId") Long userId);
}
