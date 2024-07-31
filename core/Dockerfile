# Etap budowania aplikacji Spring Boot
FROM maven:3.8.4-openjdk-17 AS build

WORKDIR /app

# Kopiowanie kodu źródłowego aplikacji
COPY . .

# Budowanie aplikacji Spring Boot
RUN mvn clean package -DskipTests

# Etap serwera Java
FROM eclipse-temurin:17-jre AS final

WORKDIR /app

# Kopiowanie pliku JAR z etapu budowania aplikacji Spring Boot
# Poprawiono błąd w ścieżce (/targe/ na /target/)
COPY --from=build /app/target/*.jar app.jar

# Uruchomienie aplikacji Spring Boot
CMD ["java", "-jar", "app.jar"]