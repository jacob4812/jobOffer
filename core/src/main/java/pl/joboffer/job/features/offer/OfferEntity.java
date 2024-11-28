package pl.joboffer.job.features.offer;

import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import pl.joboffer.job.features.company.CompanyEntity;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "offer")
public class OfferEntity {

  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Id
  @Column(name = "id")
  Long id;

  @ManyToOne
  @JoinColumn(name = "company_id", nullable = false) // Foreign key to CompanyEntity
  CompanyEntity company;

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

  @Column(name = "description")
  String description;
}
