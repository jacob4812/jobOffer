package pl.joboffer.job.features.offer;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;
import lombok.*;
import lombok.experimental.FieldDefaults;
import pl.joboffer.job.enums.OfferExperience;
import pl.joboffer.job.enums.OfferPosition;
import pl.joboffer.job.enums.OfferTechnology;
import pl.joboffer.job.features.application.ApplicationEntity;
import pl.joboffer.job.features.company.CompanyEntity;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Setter
@Getter
@Entity
@Table(name = "offer")
public class OfferEntity {

  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Id
  @Column(name = "id")
  Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "company_id", nullable = false)
  CompanyEntity company;

  @OneToMany(mappedBy = "offer", cascade = CascadeType.ALL)
  private List<ApplicationEntity> applications;

  @Column(name = "title")
  String title;

  @Column(name = "location")
  String location;

  @Column(name = "contract_type")
  String contractType;

  @Column(name = "salary")
  double salary;

  @Column(name = "expiration_date")
  LocalDate expirationDate;

  @Column(name = "offer_experience")
  @Enumerated(EnumType.STRING)
  List<OfferExperience> offerExperience;

  @Column(name = "offer_technology")
  @Enumerated(EnumType.STRING)
  List<OfferTechnology> offerTechnology;

  @Column(name = "offer_position")
  @Enumerated(EnumType.STRING)
  List<OfferPosition> offerPosition;

  @Column(name = "description")
  String description;
}
