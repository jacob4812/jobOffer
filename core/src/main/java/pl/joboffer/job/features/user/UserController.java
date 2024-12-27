package pl.joboffer.job.features.user;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.joboffer.job.dto.user.UserDetails;
import pl.joboffer.job.dto.user.UserLoginDetails;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/users")
public class UserController {

  private final UserEntityService userEntityService;

  public UserController(UserEntityService userEntityService) {
    this.userEntityService = userEntityService;
  }

  @GetMapping("/profile")
  public ResponseEntity<UserEntity> findUserByEmail(@RequestParam String email) {
    UserEntity user = userEntityService.findUserByEmail(email);
    return ResponseEntity.ok(user);
  }

  @PutMapping("/update")
  public ResponseEntity<Void> editUser(@RequestBody @Valid UserLoginDetails userLoginDetails) {
    UserEntity existingUser = userEntityService.findUserByEmail(userLoginDetails.email());

    if (existingUser == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    UserDetails userDetails = new UserDetails(
            existingUser.getId(),
            userLoginDetails.username() != null ? userLoginDetails.username() : existingUser.getLogin(),
            userLoginDetails.phoneNumber() != null ? userLoginDetails.phoneNumber() : existingUser.getPhoneNumber(),
            existingUser.getUserRole()
    );

    userEntityService.editUser(userLoginDetails, userDetails);
    return ResponseEntity.ok().build();
  }
}