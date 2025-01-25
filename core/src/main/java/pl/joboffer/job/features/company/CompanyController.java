package pl.joboffer.job.features.company;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.joboffer.job.dto.company.CompanyDetails;
import pl.joboffer.job.dto.offer.Offer;
import pl.joboffer.job.features.offer.OfferService;

@RestController
@RequestMapping(value = "/api/company")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PUBLIC)
public class CompanyController {

  @NotNull OfferService offerService;
  @NotNull CompanyService companyService;

  @GetMapping("/readCompanyJobOffers/{userId}")
  public ResponseEntity<Page<Offer>> readCompanyJobOffers(
      @PathVariable Long userId,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {
    PageRequest pageRequest = PageRequest.of(page, size);
    Page<Offer> offerPage = offerService.findJobsOfferById(userId, pageRequest);
    return ResponseEntity.ok(offerPage);
  }

  @GetMapping("readCompanyData/{userId}")
  public ResponseEntity<CompanyDetails> readCompanyData(@PathVariable Long userId) {
    CompanyDetails companyDetails = companyService.readCompanyData(userId);
    return ResponseEntity.ok(companyDetails);
  }

  @PutMapping("/updateCompanyData")
  public ResponseEntity<CompanyDetails> updateCompanyData(
      @RequestBody CompanyDetails companyDetails) {
    companyService.editCompanyData(companyDetails);
    return ResponseEntity.status(HttpStatus.OK).build();
  }
}
