package pl.joboffer.job.features.application;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.joboffer.job.dto.application.Application;
import pl.joboffer.job.dto.application.ApplicationResponse;
import pl.joboffer.job.enums.OfferStatus;
import pl.joboffer.job.enums.UserRole;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

  @Autowired private ApplicationService applicationService;

  @PostMapping
  public ResponseEntity<Map<String, String>> applyForOffer(
      @RequestParam("userId") Long userId,
      @RequestParam("offerId") Long offerId,
      @RequestParam("companyId") Long companyId,
      @RequestParam("status") OfferStatus status,
      @RequestParam("file") MultipartFile file) {
    Application applicationRequest = new Application(userId, offerId, companyId, status, file);

    applicationService.apply(applicationRequest);
    return ResponseEntity.ok(
        Collections.singletonMap("message", "Application submitted successfully."));
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
      userRole = UserRole.valueOf(role.toUpperCase());
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(Page.empty());
    }

    Page<ApplicationResponse> response =
        applicationService.getApplicationsByType(id, userRole, pageRequest);
    return ResponseEntity.ok(response);
  }

  @PutMapping("/{applicationId}/status")
  public ResponseEntity<Map<String, String>> updateApplicationStatus(
      @PathVariable Long applicationId, @RequestParam OfferStatus newStatus) {

    applicationService.updateApplicationStatus(applicationId, newStatus);

    Map<String, String> response = new HashMap<>();
    response.put("status", "success");
    response.put("message", "Application status updated successfully");

    return ResponseEntity.ok(response);
  }
}
