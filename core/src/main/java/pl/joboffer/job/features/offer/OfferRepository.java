package pl.joboffer.job.features.offer;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.joboffer.job.enums.OfferExperience;

public interface OfferRepository extends JpaRepository<OfferEntity, Long> {
  @Query("select o from OfferEntity o ")
  Optional<OfferEntity> readAllBy();

  List<OfferEntity> findByCompanyId(Long companyId);

  @Query("SELECT o FROM OfferEntity o JOIN FETCH o.company WHERE o.company.id = :userId")
  Page<OfferEntity> findOfferByCompanyId(Long userId, PageRequest pageRequest);

  @Query(
      "SELECT o FROM OfferEntity o WHERE LOWER(o.location) LIKE LOWER(CONCAT('%', :location, '%')) AND (:salary IS NULL OR o.salary >= :salary)")
  Page<OfferEntity> findByLocationAndSalary(
      String location, double salary, PageRequest pageRequest);

  @Query(
      "SELECT o FROM OfferEntity o WHERE LOWER(o.location) LIKE LOWER(CONCAT('%', :location, '%'))")
  Page<OfferEntity> findByLocation(String location, PageRequest pageRequest);

  Page<OfferEntity> findBySalaryGreaterThanEqual(double salary, PageRequest pageRequest);

  @Query(
      "SELECT o FROM OfferEntity o WHERE LOWER(o.description) LIKE LOWER(CONCAT('%', :description, '%')) AND LOWER(o.location) LIKE LOWER(CONCAT('%', :location, '%')) AND (:salary IS NULL OR o.salary >= :salary)")
  Page<OfferEntity> findByDescriptionAndLocationAndSalary(
      String description, String location, double salary, PageRequest pageRequest);

  @Query(
      "SELECT o FROM OfferEntity o WHERE LOWER(o.description) LIKE LOWER(CONCAT('%', :description, '%')) AND LOWER(o.location) LIKE LOWER(CONCAT('%', :location, '%'))")
  Page<OfferEntity> findByDescriptionAndLocation(
      String description, String location, PageRequest pageRequest);

  @Query(
      "SELECT o FROM OfferEntity o WHERE LOWER(o.description) LIKE LOWER(CONCAT('%', :description, '%')) AND (:salary IS NULL OR o.salary >= :salary)")
  Page<OfferEntity> findByDescriptionAndSalary(
      String description, double salary, PageRequest pageRequest);

  @Query(
      "SELECT o FROM OfferEntity o WHERE LOWER(o.description) LIKE LOWER(CONCAT('%', :description, '%'))")
  Page<OfferEntity> findByDescription(String description, PageRequest pageRequest);
  @Query("SELECT o FROM OfferEntity o WHERE o.offerExperience = :offerExperience")
  Page<OfferEntity> findByOfferExperience(@Param("offerExperience") OfferExperience offerExperience, PageRequest pageRequest);
}
