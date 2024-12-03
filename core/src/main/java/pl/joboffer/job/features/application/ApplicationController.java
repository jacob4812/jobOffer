package pl.joboffer.job.features.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.joboffer.job.dto.application.Application;
import pl.joboffer.job.dto.application.ApplicationResponse;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

  @Autowired private ApplicationService applicationService;

  @PostMapping
  public ResponseEntity<String> applyForOffer(@RequestBody Application applicationRequest) {
    applicationService.apply(applicationRequest);
    return ResponseEntity.ok("Application submitted successfully.");
  }

  @GetMapping("/user/{userId}")
  public ResponseEntity<Page<ApplicationResponse>> getApplicationsByUserId(
      @PathVariable Long userId,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {
    PageRequest pageRequest = PageRequest.of(page, size);
    Page<ApplicationResponse> response =
        applicationService.getApplicationsByUserId(userId, pageRequest);
    return ResponseEntity.ok(response);
  }
}
