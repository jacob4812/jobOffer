package pl.joboffer.job.features.offer;

import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

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

  @Column(name = "title")
  String title;

  @Column(name = "salary")
  double salary;

  @Column(name = "description")
  String description;

  @Column(name = "location")
  String location;

  @Column(name = "expiration_date")
  LocalDate expirationDate;

  //  @Enumerated(EnumType.STRING)
  //  @Column(name = "status", length = 20)
  //  OfferStatus status;
}
