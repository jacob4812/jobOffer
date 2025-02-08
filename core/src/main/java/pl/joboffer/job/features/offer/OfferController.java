package pl.joboffer.job.features.offer;

import jakarta.validation.constraints.NotNull;
import java.util.List;
import java.util.stream.Collectors;
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
import pl.joboffer.job.enums.OfferPosition;
import pl.joboffer.job.enums.OfferTechnology;

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
      @RequestParam(value = "experiences", required = false) List<String> experienceStrList,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {
    List<OfferExperience> experiences = null;

    if (experienceStrList != null && !experienceStrList.isEmpty()) {
      try {
        experiences =
            experienceStrList.stream()
                .map(e -> OfferExperience.valueOf(e.toUpperCase()))
                .collect(Collectors.toList());
      } catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(Page.empty());
      }
    }

    PageRequest pageRequest = PageRequest.of(page, size);
    Page<Offer> filteredOffers = offerService.filterJobOffers(experiences, pageRequest);
    return ResponseEntity.ok(filteredOffers);
  }

  @GetMapping("/filter/technology")
  public ResponseEntity<Page<Offer>> filterJobOffersByTechnology(
      @RequestParam(value = "technologies", required = false) List<String> technologyStrList,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {
    List<OfferTechnology> technologies = null;

    if (technologyStrList != null && !technologyStrList.isEmpty()) {
      try {
        technologies =
            technologyStrList.stream()
                .map(e -> OfferTechnology.valueOf(e.toUpperCase()))
                .collect(Collectors.toList());
      } catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(Page.empty());
      }
    }

    PageRequest pageRequest = PageRequest.of(page, size);
    Page<Offer> filteredOffers =
        offerService.filterJobOffersByTechnology(technologies, pageRequest);
    return ResponseEntity.ok(filteredOffers);
  }

  @GetMapping("/filter/position")
  public ResponseEntity<Page<Offer>> filterJobOffersByPosition(
      @RequestParam(value = "positions", required = false) List<String> positionStrList,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {
    List<OfferPosition> positions = null;

    if (positionStrList != null && !positionStrList.isEmpty()) {
      try {
        positions =
            positionStrList.stream()
                .map(e -> OfferPosition.valueOf(e.toUpperCase()))
                .collect(Collectors.toList());
      } catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(Page.empty());
      }
    }

    PageRequest pageRequest = PageRequest.of(page, size);
    Page<Offer> filteredOffers = offerService.filterJobOffersByPosition(positions, pageRequest);
    return ResponseEntity.ok(filteredOffers);
  }
}
