package pl.joboffer.job.features.offer;

import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import pl.joboffer.job.dto.Offer;

@Controller
@RequestMapping(value = "/api/offer")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class OfferController {
  @NotNull OfferService offerService;

  @GetMapping("/readAllJobOffers")
  public ResponseEntity<List<Offer>> readAllJobOffers() {
    return ResponseEntity.ok(offerService.findAllJobOffers());
  }
}
