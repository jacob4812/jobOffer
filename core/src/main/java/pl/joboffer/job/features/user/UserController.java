package pl.joboffer.job.features.user;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.joboffer.job.dto.user.UserDetails;

@RestController
@RequestMapping(value = "/api/user")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PUBLIC)
public class UserController {
    @NotNull
    UserEntityService userEntityService;

    @GetMapping("/readUserDetails/{userId}")
    public ResponseEntity<UserDetails> readUserDetails(@PathVariable Long userId) {
        UserDetails userDetails = userEntityService.readUserDetails(userId);
        return ResponseEntity.ok(userDetails);
    }
    @PutMapping("/updateUserData")
    public ResponseEntity<UserDetails> updateUserData(@RequestBody UserDetails userDetails){
        userEntityService.editUser(userDetails);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
