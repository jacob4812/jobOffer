package pl.joboffer.job.features.CVupload;

import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import pl.joboffer.job.features.user.UserEntity;
import pl.joboffer.job.features.user.UserRepository;

import java.io.IOException;
import java.util.Optional;

@Service
public class CvServiceImpl implements CvService{

    private final CvRepository cvRepository;
    private final UserRepository userRepository;

    public CvServiceImpl(CvRepository cvRepository,UserRepository userRepository) {
        this.userRepository = userRepository;
        this.cvRepository = cvRepository;
    }
    @Override
    public void saveCV(MultipartFile file,Long userId) {
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
            UserEntity user = userRepository.findUserById(userId)
                    .orElseThrow(()-> new RuntimeException("Nie znaleziono uzytkownika"));
            CvEntity cv = new CvEntity();
            cv.setFileName(file.getOriginalFilename());
            cv.setFileType(file.getContentType());
            cv.setData(file.getBytes());
            cv.setUser(user);
            cvRepository.save(cv);
        } catch (IOException e) {
            throw new RuntimeException("Błąd podczas przetwarzania pliku: " + e.getMessage(), e);
        }
    }

    @Override
    @Transactional
    public String getCV(Long userId) {
        UserEntity user = userRepository.findUserById(userId)
                .orElseThrow(()-> new RuntimeException("Nie znaleziono uzytkownika"));

        CvEntity cvEntity = cvRepository.findByUserId(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "CV not found"));

        return cvEntity.getFileName();
    }

    @Override
    @Transactional
    public boolean deleteCV(Long userId) {
        Optional<CvEntity> cvEntity = cvRepository.findByUserId(userId);
        if (cvEntity.isPresent()) {
            cvRepository.delete(cvEntity.get());
            return true;
        } else {
            return false;
        }
    }
}
