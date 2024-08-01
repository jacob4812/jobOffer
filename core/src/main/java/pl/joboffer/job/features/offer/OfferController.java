package pl.joboffer.job.features.offer;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.joboffer.job.dto.Offer;

@RestController
@RequestMapping(value = "/offer")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PUBLIC)
public class OfferController {

  OfferService offerService;

  @GetMapping("/readAllJobOffers")
  public ResponseEntity<Offer> readAllJobOffers() {
    return ResponseEntity.ok(offerService.findAllJobOffers());
  }
}
