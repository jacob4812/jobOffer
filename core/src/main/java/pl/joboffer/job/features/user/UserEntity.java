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
@Table(name = "user_table")
public class UserEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "login", nullable = false)
  private String login;

  @Column(name = "email", unique = true, nullable = false)
  private String email;

  @Column(name = "password", nullable = false)
  private String password;

  @Column(name = "phone_number")
  private Long phoneNumber;

  @Enumerated(EnumType.STRING)
  @Column(name = "user_role")
  private UserRole userRole;
}
