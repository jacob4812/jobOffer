package pl.joboffer.job;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication(scanBasePackageClasses = JobApplication.class)
@EnableJpaAuditing
public class JobApplication {
  public static void main(String[] args) {
    SpringApplication.run(JobApplication.class, args);
  }
}
