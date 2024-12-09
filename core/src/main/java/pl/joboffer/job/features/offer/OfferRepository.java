package pl.joboffer.job.features.offer;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OfferRepository extends JpaRepository<OfferEntity, Long> {
  @Query("select o from OfferEntity o ")
  Optional<OfferEntity> readAllBy();

  List<OfferEntity> findByCompanyId(Long companyId);

  @Query("SELECT o FROM OfferEntity o JOIN FETCH o.company WHERE o.company.id = :userId")
  Page<OfferEntity> findOfferByCompanyId(Long userId, PageRequest pageRequest);
}
