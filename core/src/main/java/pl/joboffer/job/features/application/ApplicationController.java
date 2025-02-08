package pl.joboffer.job.features.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.joboffer.job.dto.application.Application;
import pl.joboffer.job.dto.application.ApplicationResponse;
import pl.joboffer.job.enums.UserRole;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

  @Autowired private ApplicationService applicationService;

  @PostMapping
  public ResponseEntity<String> applyForOffer(@RequestBody Application applicationRequest) {
    applicationService.apply(applicationRequest);
    return ResponseEntity.ok("Application submitted successfully.");
  }

  @GetMapping("/{role}/{id}")
  public ResponseEntity<Page<ApplicationResponse>> getApplicationsByType(
          @PathVariable String role,
          @PathVariable Long id,
          @RequestParam(defaultValue = "0") int page,
          @RequestParam(defaultValue = "10") int size) {

    PageRequest pageRequest = PageRequest.of(page, size);
    UserRole userRole;

    try {
      userRole = UserRole.valueOf(role.toUpperCase()); // Konwersja ze stringa na UserRole
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(Page.empty()); // Obsługa błędnej wartości
    }

    Page<ApplicationResponse> response = applicationService.getApplicationsByType(id, userRole, pageRequest);
    return ResponseEntity.ok(response);
  }
}
