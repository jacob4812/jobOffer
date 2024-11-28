package pl.joboffer.job.features.company;

import jakarta.persistence.*;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import pl.joboffer.job.enums.UserRole;
import pl.joboffer.job.features.offer.OfferEntity;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "company")
public class CompanyEntity {
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Id
  @Column(name = "id")
  Long id;

  @Column(name = "companyName")
  String companyName;

  @Column(name = "nip")
  Long nip;

  @Column(name = "email")
  String email;

  @Column(name = "phoneNumber")
  Long phoneNumber;

  @Column(name = "password")
  String password;

  @Enumerated(value = EnumType.STRING)
  @Column(name = "user_role")
  UserRole userRole;

  @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
  List<OfferEntity> offers;
}
