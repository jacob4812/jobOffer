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

    @PostMapping("/upload")
    public ResponseEntity<String> uploadCV(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty() || !file.getContentType().equals("application/pdf")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Only PDF files are allowed.");
        }

        try {
            cvService.saveCV(file);
            return ResponseEntity.ok("File uploaded successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file.");
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getCV(@PathVariable Long id) {
        byte[] cvData = cvService.getCV(id);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF); // Określenie, że plik to PDF
        headers.setContentDisposition(ContentDisposition.inline().filename("cv.pdf").build()); // Nagłówek dla przeglądarki

        return new ResponseEntity<>(cvData,headers, HttpStatus.OK); // Zwrócenie pliku w odpowiedzi
    }
}
