package pl.joboffer.job.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum OfferStatus {
  ACTIVE_STATUS("active"),
  NOT_ACTIVE_STATUS("notActive"),
  IN_PROGRESS("In Progress");

  private final String status;

  OfferStatus(String status) {
    this.status = status;
  }

  @JsonValue
  public String getStatus() {
    return status;
  }

  @JsonCreator
  public static OfferStatus fromString(String status) {
    for (OfferStatus offerStatus : OfferStatus.values()) {
      if (offerStatus.status.equalsIgnoreCase(status)) {
        return offerStatus;
      }
    }
    throw new IllegalArgumentException("Unknown status: " + status);
  }
}
