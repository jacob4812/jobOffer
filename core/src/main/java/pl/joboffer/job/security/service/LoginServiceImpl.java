package pl.joboffer.job.security.service;

import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pl.joboffer.job.dto.company.CompanyLoginDetails;
import pl.joboffer.job.dto.user.UserLoginDetails;
import pl.joboffer.job.features.company.CompanyService;
import pl.joboffer.job.security.jwt.JwtUtils;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {

  @NotNull UserService userService;
  @NotNull CompanyService companyService;
  @NotNull JwtUtils jwtUtils;
  @NotNull AuthenticationManager authenticationManager;

  @Override
  @Transactional
  public String login(UserLoginDetails userLoginDetails) {
    if (userLoginDetails == null) {
      return null;
    }
    Authentication authentication;
    try {
      authentication =
          authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(
                  userLoginDetails.email(), userLoginDetails.password()));
      log.info(String.format("Uzytkownik o loginie %s", userLoginDetails.email()));
    } catch (BadCredentialsException e) {
      log.warn(String.format("Bledne dane logowania dla loginu %s", userLoginDetails.email()));
      return null;
    }
    SecurityContextHolder.getContext().setAuthentication(authentication);
    var userDetails = userService.loadUserByUsername(authentication.getName());
    return jwtUtils.generateToken(
        userDetails.getUsername(), userDetails.getAuthorities(), userDetails.getIdUser());
  }

  @Override
  @Transactional
  public String loginCompany(CompanyLoginDetails companyLoginDetails) {
    if (companyLoginDetails == null) {
      return null;
    }
    Authentication authentication;
    try {
      authentication =
          authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(
                  companyLoginDetails.email(), companyLoginDetails.password()));
      log.info(String.format("Firma o loginie %s", companyLoginDetails.email()));
    } catch (BadCredentialsException e) {
      log.warn(String.format("Bledne dane logowania dla firmy %s", companyLoginDetails.email()));
      return null;
    }
    SecurityContextHolder.getContext().setAuthentication(authentication);
    var companyDetails = companyService.findUserByEmail(authentication.getName());
    return jwtUtils.generateToken(
        companyDetails.getUsername(), companyDetails.getAuthorities(), companyDetails.getIdUser());
  }
}
