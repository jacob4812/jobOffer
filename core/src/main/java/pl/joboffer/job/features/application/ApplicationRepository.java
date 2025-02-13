package pl.joboffer.job.features.application;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationRepository extends JpaRepository<ApplicationEntity, Long> {
  @Query(
      """
      SELECT a FROM ApplicationEntity a
      JOIN FETCH a.offer o
      JOIN FETCH o.company c
      JOIN FETCH a.user u
      WHERE a.user.id = :userId
      """)
  Page<ApplicationEntity> findByUserId(Long userId, PageRequest pageRequest);

  @Query(
      """
      SELECT a FROM ApplicationEntity a
      JOIN FETCH a.offer o
      JOIN FETCH o.company c
      JOIN FETCH a.user u
      WHERE a.company.id = :companyId
      """)
  Page<ApplicationEntity> findByCompanyId(Long companyId, PageRequest pageRequest);
}
