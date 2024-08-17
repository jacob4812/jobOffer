package pl.joboffer.job.security.dto;

import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import pl.joboffer.job.enums.UserRole;

@EqualsAndHashCode(callSuper = true)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Getter
public class JobUser extends User {
  Long idUser;

  public JobUser(String username, String password, Long idUser, UserRole userRole) {
    super(username, password, AuthorityUtils.createAuthorityList(userRole.name()));
    this.idUser = idUser;
  }
}
