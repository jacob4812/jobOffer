package pl.joboffer.job.security.controller;

import javax.validation.Valid;
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
import pl.joboffer.job.dto.registerResponse.RegistrationResponse;
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
  public ResponseEntity<RegistrationResponse> registerUser(
      @Valid @RequestBody UserRegisterDetails userRegisterDetails) {
    RegistrationResponse response =registerService.signup(userRegisterDetails);
    if(response.emailUsed()){
      return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @PostMapping("/company/signup")
  public ResponseEntity<RegistrationResponse> registerCompany(
      @Valid @RequestBody CompanyRegisterDetails companyRegisterDetails) {
    RegistrationResponse response = registerService.companySignup(companyRegisterDetails);
    if (response.emailUsed()){
      return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }
}
