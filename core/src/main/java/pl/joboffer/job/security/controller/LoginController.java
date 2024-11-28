package pl.joboffer.job.security.controller;

import java.util.Optional;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.joboffer.job.dto.user.UserLoginDetails;
import pl.joboffer.job.dto.web.JwtToken;
import pl.joboffer.job.security.service.LoginService;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class LoginController {
  @NotNull LoginService loginService;

  @PostMapping("/login")
  public ResponseEntity<JwtToken> login(@RequestBody UserLoginDetails userLoginDetails) {
    return Optional.ofNullable(loginService.login(userLoginDetails))
        .map(it -> new ResponseEntity<>(new JwtToken(it), HttpStatus.OK))
        .orElseGet(() -> new ResponseEntity<>(HttpStatus.UNAUTHORIZED));
  }
  //  @PostMapping("/loginCompany")
  //  public ResponseEntity<JwtToken> loginCompany(@RequestBody CompanyLoginDetails
  // userLoginDetails) {
  //    return Optional.ofNullable(loginService.loginCompany(userLoginDetails))
  //            .map(it -> new ResponseEntity<>(new JwtToken(it), HttpStatus.OK))
  //            .orElseGet(() -> new ResponseEntity<>(HttpStatus.UNAUTHORIZED));
  //  }
}
