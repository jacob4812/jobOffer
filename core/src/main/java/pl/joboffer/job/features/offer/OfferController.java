package pl.joboffer.job.features.offer;

import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import pl.joboffer.job.dto.Offer;

@Controller
@RequestMapping(value = "/offer")
public class OfferController {
  @NotNull OfferService offerService;

  @GetMapping("/readAllJobOffers")
  public ResponseEntity<Offer> readAllJobOffers() {
    return ResponseEntity.ok(offerService.findAllJobOffers());
  }
}
