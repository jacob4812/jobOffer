package pl.joboffer.job.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum OfferExperience {
    INTERN("INTERN"),
    JUNIOR("JUNIOR"),
    MID("MID"),
    SENIOR("SENIOR"),
    EXPERT("EXPERT");

    private final String experience;

    OfferExperience(String experience) {
        this.experience = experience;
    }
    @JsonValue
    public String getExperience() {
        return experience;
    }

    @JsonCreator
    public static OfferExperience fromString(String value) {
        for (OfferExperience exp : OfferExperience.values()) {
            if (exp.experience.equalsIgnoreCase(value)) {
                return exp;
            }
        }
        throw new IllegalArgumentException("Invalid experience level: " + value);
    }
}
