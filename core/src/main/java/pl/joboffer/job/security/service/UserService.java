package pl.joboffer.job.security.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import pl.joboffer.job.security.dto.JobUser;

public interface UserService extends UserDetailsService {
  JobUser loadUserByUsername(String email) throws UsernameNotFoundException;
}
