package pl.joboffer.job.security.swagger;

import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SpringDocConfig {
  @Bean
  public GroupedOpenApi api() {
    return GroupedOpenApi.builder()
            .group("public-api")
            .pathsToMatch("/**")
            .build();
  }

}
