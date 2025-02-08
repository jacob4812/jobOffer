package pl.joboffer.job.features.application;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import pl.joboffer.job.enums.OfferStatus;
import pl.joboffer.job.features.company.CompanyEntity;
import pl.joboffer.job.features.offer.OfferEntity;
import pl.joboffer.job.features.user.UserEntity;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "application")
public class ApplicationEntity {
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Id
  @Column(name = "id")
  Long id;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private UserEntity user;

  @ManyToOne
  @JoinColumn(name = "offer_id", nullable = false)
  private OfferEntity offer;

  @ManyToOne
  @JoinColumn(name = "company_id", nullable = false)
  private CompanyEntity company;

  private LocalDateTime applicationDate;
  @Enumerated(EnumType.STRING)
  @Column(name = "status", nullable = false)
  private OfferStatus status;
}
