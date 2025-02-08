package pl.joboffer.job.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum OfferPosition {
  ADMINISTRACJA("Administracja"),
  ANALIZA("Analiza"),
  BACKOFFICE("Back-Office"),
  BIZNES("Biznes Manager"),
  DANE("Dane"),
  PROJEKTOWANIE("Projektowanie"),
  DEVOPS("DevOps"),
  TESTING("TESTING"),
  BACKEND("Backend"),
  FRONTEND("Frontend"),
  FULLSTACK("Fullstack"),
  PM("PM"),
  INTEGRACJA("Integracja");

  private final String position;

  OfferPosition(String position) {
    this.position = position;
  }

  @JsonValue
  public String getPosition() {
    return position;
  }

  @JsonCreator
  public static OfferPosition fromString(String value) {
    for (OfferPosition exp : OfferPosition.values()) {
      if (exp.position.equalsIgnoreCase(value)) {
        return exp;
      }
    }
    throw new IllegalArgumentException("Invalid position: " + value);
  }
}
