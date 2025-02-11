package pl.joboffer.job.features.offer;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.joboffer.job.enums.OfferExperience;
import pl.joboffer.job.enums.OfferPosition;
import pl.joboffer.job.enums.OfferTechnology;

public interface OfferRepository extends JpaRepository<OfferEntity, Long> {
  @Query("select o from OfferEntity o ")
  Optional<OfferEntity> readAllBy();

  List<OfferEntity> findByCompanyId(Long companyId);

  @Query("SELECT o FROM OfferEntity o JOIN FETCH o.company WHERE o.company.id = :userId")
  Page<OfferEntity> findOfferByCompanyId(Long userId, PageRequest pageRequest);

  @Query(
      "SELECT o FROM OfferEntity o WHERE LOWER(o.location) LIKE LOWER(CONCAT('%', :location, '%')) AND (:salaryMin IS NULL OR o.salaryMin >= :salaryMin)")
  Page<OfferEntity> findByLocationAndSalaryMin(
      String location, double salaryMin, PageRequest pageRequest);

  @Query(
      "SELECT o FROM OfferEntity o WHERE LOWER(o.location) LIKE LOWER(CONCAT('%', :location, '%'))")
  Page<OfferEntity> findByLocation(String location, PageRequest pageRequest);

  Page<OfferEntity> findBySalaryMinGreaterThanEqual(double salaryMin, PageRequest pageRequest);

  @Query(
      "SELECT o FROM OfferEntity o WHERE LOWER(o.description) LIKE LOWER(CONCAT('%', :description, '%')) AND LOWER(o.location) LIKE LOWER(CONCAT('%', :location, '%')) AND (:salaryMin IS NULL OR o.salaryMin >= :salaryMin)")
  Page<OfferEntity> findByDescriptionAndLocationAndSalaryMin(
      String description, String location, double salaryMin, PageRequest pageRequest);

  @Query(
      "SELECT o FROM OfferEntity o WHERE LOWER(o.description) LIKE LOWER(CONCAT('%', :description, '%')) AND LOWER(o.location) LIKE LOWER(CONCAT('%', :location, '%'))")
  Page<OfferEntity> findByDescriptionAndLocation(
      String description, String location, PageRequest pageRequest);

  @Query(
      "SELECT o FROM OfferEntity o WHERE LOWER(o.description) LIKE LOWER(CONCAT('%', :description, '%')) AND (:salaryMin IS NULL OR o.salaryMin >= :salaryMin)")
  Page<OfferEntity> findByDescriptionAndSalaryMin(
      String description, double salaryMin, PageRequest pageRequest);

  @Query(
      "SELECT o FROM OfferEntity o WHERE LOWER(o.description) LIKE LOWER(CONCAT('%', :description, '%'))")
  Page<OfferEntity> findByDescription(String description, PageRequest pageRequest);

  @Query(
      "SELECT o FROM OfferEntity o "
          + "WHERE (:offerExperiences IS NULL OR o.offerExperience IN :offerExperiences) "
          + "AND o.offerExperience IS NOT NULL")
  Page<OfferEntity> findByOfferExperience(
      @Param("offerExperiences") List<OfferExperience> offerExperiences, PageRequest pageRequest);

  @Query(
      "SELECT o FROM OfferEntity o "
          + "WHERE (:offerPositions IS NULL OR o.offerPosition IN :offerPositions) "
          + "AND o.offerPosition IS NOT NULL")
  Page<OfferEntity> findByOfferPosition(
      @Param("offerPositions") List<OfferPosition> offerPositions, PageRequest pageRequest);

  @Query(
      "SELECT o FROM OfferEntity o "
          + "WHERE (:offerTechnologies IS NULL OR o.offerTechnology IN :offerTechnologies) "
          + "AND o.offerTechnology IS NOT NULL")
  Page<OfferEntity> findByOfferTechnology(
      @Param("offerTechnologies") List<OfferTechnology> offerTechnologies, PageRequest pageRequest);
}
