package pl.joboffer.job.features.CVupload;

import jakarta.transaction.Transactional;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.UUID;

@Service
public class CvServiceImpl implements CvService{

    private final CvRepository cvRepository;

    public CvServiceImpl(CvRepository cvRepository) {
        this.cvRepository = cvRepository;
    }
    @Override
    public void saveCV(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Plik nie może być pusty.");
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.equals("application/pdf")) {
            throw new IllegalArgumentException("Tylko pliki PDF są akceptowane.");
        }

        long maxSizeInBytes = 2 * 1024 * 1024;
        if (file.getSize() > maxSizeInBytes) {
            throw new IllegalArgumentException("Rozmiar pliku nie może przekraczać 2 MB.");
        }

        try {
            CvEntity cv = new CvEntity();
            cv.setFileName(file.getOriginalFilename());
            cv.setFileType(file.getContentType());
            cv.setData(file.getBytes());
            cvRepository.save(cv);
        } catch (IOException e) {
            throw new RuntimeException("Błąd podczas przetwarzania pliku: " + e.getMessage(), e);
        }
    }

    @Override
    @Transactional
    public byte[] getCV(Long id) {
        CvEntity cvEntity = cvRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "CV not found"));

        return cvEntity.getData();
    }
}
