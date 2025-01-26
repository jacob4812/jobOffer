package pl.joboffer.job.features.CVupload;

import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Controller
@RequestMapping("/api/cv")
public class CvController {

    private final CvService cvService;

    public CvController(CvService cvService) {
        this.cvService = cvService;
    }

    @PostMapping("/upload/{userId}")
    public ResponseEntity<String> uploadCV(@RequestParam("file") MultipartFile file, @PathVariable Long userId) {
        if (file.isEmpty() || !file.getContentType().equals("application/pdf")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Only PDF files are allowed.");
        }

        try {
            cvService.saveCV(file,userId);
            return ResponseEntity.ok("File uploaded successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file.");
        }
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
    public ResponseEntity deleteCV(@PathVariable Long userId){
        try {
            boolean deleted = cvService.deleteCV(userId);
            if (deleted) {
                return ResponseEntity.ok("CV deleted successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("CV not found.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete CV.");
        }
    }
//    @GetMapping("/{id}")
//    public ResponseEntity<byte[]> getCV(@PathVariable Long id) {
//        byte[] cvData = cvService.getCV(id);
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_PDF); // Określenie, że plik to PDF
//        headers.setContentDisposition(ContentDisposition.inline().filename("cv.pdf").build()); // Nagłówek dla przeglądarki
//
//        return new ResponseEntity<>(cvData,headers, HttpStatus.OK); // Zwrócenie pliku w odpowiedzi
//    }
}
