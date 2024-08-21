package pl.joboffer.job.features.offer;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import pl.joboffer.job.dto.offer.Offer;

@RestController
@RequestMapping(value = "/api/offer")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PUBLIC)
public class OfferController {
  @NotNull OfferService offerService;

  @GetMapping("/readAllJobOffers")
  public ResponseEntity<Page<Offer>> readAllJobOffers(
      @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
    PageRequest pageRequest = PageRequest.of(page, size);
    Page<Offer> offerPage = offerService.findAllJobOffers(pageRequest);
    return ResponseEntity.ok(offerPage);
  }
}
