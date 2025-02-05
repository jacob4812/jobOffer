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
import pl.joboffer.job.enums.OfferExperience;

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

  @PostMapping("/addJobOffer")
  public ResponseEntity<OfferEntity> addJobOffer(@RequestBody Offer offer) {
    return ResponseEntity.ok(offerService.addJobOffer(offer));
  }

  @PutMapping("/editJobOffer")
  public ResponseEntity<OfferEntity> editJobOffer(@RequestBody Offer offer) {
    return ResponseEntity.ok(offerService.editJobOffer(offer));
  }

  @DeleteMapping("/deleteJobOffer/{id}")
  public ResponseEntity<?> deleteJobOffer(@PathVariable("id") Long id) {
    offerService.deleteJobOffer(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/search")
  public ResponseEntity<Page<Offer>> searchJobOffers(
      @RequestParam(value = "description", required = false) String description,
      @RequestParam(value = "location", required = false) String location,
      @RequestParam(value = "salary", required = false) Double salary,
      @RequestParam(value = "page", defaultValue = "0") int page,
      @RequestParam(value = "size", defaultValue = "10") int size) {
    PageRequest pageRequest = PageRequest.of(page, size);
    Page<Offer> jobOffers =
        offerService.searchJobOffers(description, location, salary, pageRequest);
    return ResponseEntity.ok(jobOffers);
  }

  @GetMapping("/filter/experience")
  public ResponseEntity<Page<Offer>> filterJobOffersByExperience(
          @RequestParam OfferExperience experience,
          @RequestParam(defaultValue = "0") int page,
          @RequestParam(defaultValue = "10") int size) {
    PageRequest pageRequest = PageRequest.of(page, size);
    Page<Offer> filteredOffers = offerService.filterJobOffers(experience, pageRequest);
    return ResponseEntity.ok(filteredOffers);
  }
}
