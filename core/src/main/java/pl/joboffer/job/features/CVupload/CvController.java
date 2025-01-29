package pl.joboffer.job.features.CVupload;

import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/api/cv")
public class CvController {

  private final CvService cvService;

  public CvController(CvService cvService) {
    this.cvService = cvService;
  }

  @PostMapping("/upload/{userId}")
  public ResponseEntity<String> uploadCV(
      @RequestParam("file") MultipartFile file, @PathVariable Long userId) {
    cvService.saveCV(file, userId);
    return ResponseEntity.ok("File uploaded successfully.");
  }

  @GetMapping("/{id}")
  public ResponseEntity<String> getCV(@PathVariable Long id) {
    String fileName = cvService.getCV(id);
    if (fileName.isEmpty()) {
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.ok(fileName);
    }
  }

  @DeleteMapping("/delete/{userId}")
  public ResponseEntity<String> deleteCV(@PathVariable Long userId) {
    cvService.deleteCV(userId);
    return ResponseEntity.ok("CV deleted successfully.");
  }

  @PutMapping("/edit/{userId}")
  public ResponseEntity<String> editCv(
      @RequestParam("file") MultipartFile file, @PathVariable Long userId) {
    cvService.editCV(file, userId);
    return ResponseEntity.ok("CV updated successfully");
  }
}
