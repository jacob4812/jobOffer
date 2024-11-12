package pl.joboffer.job.security.swagger;

import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringDocConfig {
  @Bean
  public GroupedOpenApi api() {
    return GroupedOpenApi.builder().group("public-api").pathsToMatch("/**").build();
  }
}
