# Use official OpenJDK 17 Alpine image
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Install bash, curl, git, maven
RUN apk add --no-cache bash curl git maven

# Copy Maven project files
COPY pom.xml .
COPY src ./src

# Build the project (skip tests for faster build)
RUN mvn clean package -DskipTests

# Copy the built JAR to a fixed name
RUN cp target/chat-app-1.0.0.jar chat-app.jar

# Expose port 8080 (Render will map $PORT)
EXPOSE 8080

# Set the PORT environment variable for Render
ENV PORT=8080

# Run the Spring Boot JAR
ENTRYPOINT ["java", "-jar", "chat-app.jar"]