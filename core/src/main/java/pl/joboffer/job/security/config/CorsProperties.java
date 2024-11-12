package pl.joboffer.job.security.config;

import java.util.List;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "cors")
@Data
class CorsProperties {
  private List<String> allowedOrigins;
  private List<String> allowedMethods;
  private List<String> allowedHeaders;

  public List<String> getAllowedOrigins() {
    return allowedOrigins;
  }

  public List<String> getAllowedMethods() {
    return allowedMethods;
  }

  public List<String> getAllowedHeaders() {
    return allowedHeaders;
  }
}
