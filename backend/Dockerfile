# Multi-stage build for Spring Boot
FROM maven:3.8.6-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM openjdk:17-slim
WORKDIR /app
COPY --from=build /app/target/mis-talleres-backend-1.0.0.jar app.jar
EXPOSE 8080
# Accept environment variables at runtime
ENV DATABASE_URL=${DATABASE_URL}
ENV SPRING_DATASOURCE_USERNAME=${SPRING_DATASOURCE_USERNAME}
ENV SPRING_DATASOURCE_PASSWORD=${SPRING_DATASOURCE_PASSWORD}
CMD ["java", "-jar", "app.jar"]
