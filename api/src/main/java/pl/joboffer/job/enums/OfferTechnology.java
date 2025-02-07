package pl.joboffer.job.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum OfferTechnology {
    JAVASCRIPT("JavaScript"),
    TYPESCRIPT("TypeScript"),
    JAVA("JAVA"),
    PYTHON("Python"),
    CSHARP("C#"),
    RUBY("Ruby"),
    GO("Go"),
    SWIFT("Swift"),
    KOTLIN("Kotlin"),
    CPLUSPLUS("C++"),
    RUST("Rust"),
    UX("UX/UI"),
    ANGULAR("Angular"),
    SPRING("SPRING"),
    SQL("SQL"),
    LINUX("Linux");


    private final String technology;

    OfferTechnology(String technology) {
        this.technology = technology;
    }
    @JsonValue
    public String getTechnology() {
        return technology;
    }

    @JsonCreator
    public static OfferTechnology fromString(String value) {
        for (OfferTechnology exp : OfferTechnology.values()) {
            if (exp.technology.equalsIgnoreCase(value)) {
                return exp;
            }
        }
        throw new IllegalArgumentException("Invalid technology: " + value);
    }
}
