package pl.joboffer.job.features.offer;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OfferRepository extends JpaRepository<OfferEntity, Long> {
  @Query("select o from OfferEntity o ")
  Optional<OfferEntity> readAllBy();

  List<OfferEntity> findByCompanyId(Long companyId);
}
