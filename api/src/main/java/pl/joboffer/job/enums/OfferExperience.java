package pl.joboffer.job.enums;

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
}
