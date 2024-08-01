package pl.joboffer.job.enums;

public enum OfferStatus {
  ACTIVE_STATUS("active"),
  NOT_ACTIVE_STATUS("notActive");

  private final String status;

  OfferStatus(String status) {
    this.status = status;
  }
}
