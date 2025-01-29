package pl.joboffer.job.features.CVupload;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface CvService {
  void saveCV(MultipartFile file, Long userId);

  String getCV(Long userId);

  boolean deleteCV(Long userId);

  void editCV(MultipartFile file, Long userId);
}
