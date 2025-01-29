package pl.joboffer.job.features.company;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import pl.joboffer.job.enums.UserRole;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Setter
@Getter
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
}
