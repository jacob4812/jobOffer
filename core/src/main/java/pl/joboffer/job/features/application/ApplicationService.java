package pl.joboffer.job.features.application;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import pl.joboffer.job.dto.application.Application;
import pl.joboffer.job.dto.application.ApplicationResponse;
import pl.joboffer.job.enums.UserRole;

@Service
public interface ApplicationService {
  void apply(Application request);

//  Page<ApplicationResponse> getApplicationsByUserId(Long userId, PageRequest pageRequest);

  Page<ApplicationResponse> getApplicationsByType(Long id, UserRole type, PageRequest pageRequest);
}
