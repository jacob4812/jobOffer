package pl.joboffer.job.features.application;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationRepository extends JpaRepository<ApplicationEntity, Long> {
  Page<ApplicationEntity> findByUserId(Long userId, PageRequest pageRequest);

  Page<ApplicationEntity> findByCompanyId(Long companyId, PageRequest pageRequest);
}
