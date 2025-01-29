package pl.joboffer.job.features.CVupload;

import jakarta.transaction.Transactional;
import java.io.IOException;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import pl.joboffer.job.features.user.UserEntity;
import pl.joboffer.job.features.user.UserRepository;

@Service
public class CvServiceImpl implements CvService {

  private final CvRepository cvRepository;
  private final UserRepository userRepository;

  public CvServiceImpl(CvRepository cvRepository, UserRepository userRepository) {
    this.userRepository = userRepository;
    this.cvRepository = cvRepository;
  }

  @Override
  @Transactional
  public void saveCV(MultipartFile file, Long userId) {
    validateFile(file);

    UserEntity user =
        userRepository
            .findUserById(userId)
            .orElseThrow(
                () ->
                    new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Nie znaleziono użytkownika"));
    boolean cvExists = cvRepository.findByUserId(userId).isPresent();
    if (cvExists) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Użytkownik już posiada CV.");
    }
    try {
      CvEntity cvEntity = new CvEntity();

      cvEntity.setFileName(file.getOriginalFilename());
      cvEntity.setFileType(file.getContentType());
      cvEntity.setData(file.getBytes());
      cvEntity.setUser(user);
      cvRepository.save(cvEntity);
    } catch (IOException e) {
      throw new ResponseStatusException(
          HttpStatus.INTERNAL_SERVER_ERROR, "Błąd podczas przetwarzania pliku.");
    }
  }

  private void validateFile(MultipartFile file) {
    if (file == null || file.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Plik nie może być pusty.");
    }

    if (!"application/pdf".equals(file.getContentType())) {
      throw new ResponseStatusException(
          HttpStatus.UNSUPPORTED_MEDIA_TYPE, "Tylko pliki PDF są akceptowane.");
    }

    long maxSizeInBytes = 2 * 1024 * 1024;
    if (file.getSize() > maxSizeInBytes) {
      throw new ResponseStatusException(
          HttpStatus.PAYLOAD_TOO_LARGE, "Rozmiar pliku nie może przekraczać 2 MB.");
    }
  }

  @Override
  @Transactional
  public Optional<String> getCV(Long userId) {
    UserEntity user =
        userRepository
            .findUserById(userId)
            .orElseThrow(() -> new RuntimeException("Nie znaleziono uzytkownika"));

    return cvRepository.findByUserId(userId).map(CvEntity::getFileName);
  }

  @Override
  @Transactional
  public boolean deleteCV(Long userId) {
    UserEntity user =
        userRepository
            .findUserById(userId)
            .orElseThrow(
                () ->
                    new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Nie znaleziono użytkownika"));
    Optional<CvEntity> cvEntity =
        Optional.ofNullable(
            cvRepository
                .findByUserId(userId)
                .orElseThrow(
                    () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "CV not found")));

    try {
      cvRepository.delete(cvEntity.get());
      return true;
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to delete CV.");
    }
  }

  @Override
  @Transactional
  public void editCV(MultipartFile file, Long userId) {
    validateFile(file);

    UserEntity user =
        userRepository
            .findUserById(userId)
            .orElseThrow(
                () ->
                    new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Nie znaleziono użytkownika"));
    Optional<CvEntity> cvEntity =
        Optional.ofNullable(
            cvRepository
                .findByUserId(userId)
                .orElseThrow(
                    () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "CV not found")));

    try {
      CvEntity cv = cvEntity.get();
      cv.setData(file.getBytes());
      cv.setFileName(file.getOriginalFilename());
      cv.setFileType(file.getContentType());
      cv.setUser(user);
      cvRepository.save(cv);
    } catch (IOException e) {
      throw new RuntimeException("Error updating CV file", e);
    }
  }
}
