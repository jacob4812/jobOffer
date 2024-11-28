package pl.joboffer.job.security.controller;

import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.joboffer.job.dto.company.CompanyRegisterDetails;
import pl.joboffer.job.dto.user.UserRegisterDetails;
import pl.joboffer.job.features.user.UserRepository;
import pl.joboffer.job.security.jwt.JwtUtils;
import pl.joboffer.job.security.service.RegisterService;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class RegisterController {
  @Autowired UserRepository userRepository;

  @Autowired PasswordEncoder passwordEncoder;
  @Autowired JwtUtils jwtUtils;

  @NotNull RegisterService registerService;

  @PostMapping("/signup")
  public ResponseEntity<Void> registerUser(@RequestBody UserRegisterDetails userRegisterDetails) {
    registerService.signup(userRegisterDetails);
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @PostMapping("/company/signup")
  public ResponseEntity<Void> registerCompany(
      @RequestBody CompanyRegisterDetails companyRegisterDetails) {
    registerService.companySignup(companyRegisterDetails);
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }
}
