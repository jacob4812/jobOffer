package pl.joboffer.job.security.config;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import pl.joboffer.job.security.jwt.AuthTokenFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(jsr250Enabled = true)
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SecurityConfiguration {

  CorsProperties corsProperties;
  AuthTokenFilter jwtAuthenticationFilter;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http.cors(cors -> corsConfigurationSource())
        .csrf(CsrfConfigurer::disable)
        .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(
            auth ->
                auth.requestMatchers("/api/auth/signup")
                    .permitAll()
                    .requestMatchers("/api/auth/company/signup")
                    .permitAll()
                    .requestMatchers("/api/login")
                    .permitAll()
                    .requestMatchers("/api/loginCompany")
                    .permitAll()
                    .requestMatchers("/api/offer/readAllJobOffers")
                    .permitAll()
                    .requestMatchers("/api/company/readCompanyJobOffers/{userId}")
                    .permitAll()
                    .requestMatchers("/api/company/readCompanyData/{userId}")
                    .permitAll()
                    .requestMatchers("/api/company/*")
                    .permitAll()
                    .requestMatchers("/api/applications")
                    .permitAll()
                    .requestMatchers("/api/applications/user/{userId}")
                    .permitAll()
                    .requestMatchers("/api/offer/*")
                    .permitAll()
                    .requestMatchers("/swagger-ui.html", "/v3/api-docs/**", "/swagger-ui/**")
                    .permitAll()
                    .requestMatchers("/api/offer/deleteJobOffer/{id}")
                    .permitAll()
                    .requestMatchers("/api/offer/editJobOffer")
                    .permitAll()
                        .requestMatchers("/api/offer/filter/*")
                        .permitAll()
                    .requestMatchers("/api/user/*/*")
                    .permitAll()
                    .requestMatchers("/api/user/*")
                    .permitAll()
                    .requestMatchers("/api/cv/upload/*")
                    .permitAll()
                    .requestMatchers("/api/cv/*")
                    .permitAll()
                    .requestMatchers("/api/cv/delete/*")
                    .permitAll()
                    .requestMatchers("/api/cv/edit/*")
                    .permitAll()
                    .anyRequest()
                    .authenticated())
        .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(nullSafeProp(corsProperties.getAllowedOrigins()));
    configuration.setAllowedOrigins(nullSafeProp(corsProperties.getAllowedOrigins()));
    configuration.setAllowedMethods(nullSafeProp(corsProperties.getAllowedMethods()));
    configuration.setAllowedHeaders(nullSafeProp(corsProperties.getAllowedHeaders()));
    configuration.setMaxAge(1800L);
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }

  private List<String> nullSafeProp(List<String> corsProperty) {
    return Optional.ofNullable(corsProperty).orElse(Collections.emptyList());
  }

  @Bean
  public AuthenticationManager authenticationManager(
      AuthenticationConfiguration authenticationConfiguration) throws Exception {
    return authenticationConfiguration.getAuthenticationManager();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
