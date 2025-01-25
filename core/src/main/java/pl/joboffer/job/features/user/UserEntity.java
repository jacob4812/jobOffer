package pl.joboffer.job.features.user;

import jakarta.persistence.*;
import java.util.List;
import lombok.*;
import lombok.experimental.FieldDefaults;
import pl.joboffer.job.enums.UserRole;
import pl.joboffer.job.features.application.ApplicationEntity;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "userTable")
public class UserEntity {

  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Id
  @Column(name = "id")
  Long id;

  @OneToMany(mappedBy = "user")
  private List<ApplicationEntity> applications;

  @Column(name = "login")
  String login;

  @Column(name = "email")
  String email;

  @Column(name = "password")
  String password;

  @Column(name = "name")
  String name;

  @Column(name = "surname")
  String surname;

  @Column(name = "phoneNumber")
  Long phoneNumber;

  @Enumerated(value = EnumType.STRING)
  @Column(name = "user_role")
  UserRole userRole;
}
