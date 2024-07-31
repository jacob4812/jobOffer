package pl.joboffer.job.features.offer;

import jakarta.persistence.*;
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

  @Column(name = "name")
  String name;

  @Column(name = "salary")
  double salary;

  @Column(name = "description")
  String description;

  @Column(name = "location")
  String location;
}
