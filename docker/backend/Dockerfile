# ============================================================
# EduOps backend - multi-stage build
# Stage 1: Maven build  ->  Stage 2: slim JRE runtime
# ============================================================

FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /build
# Dependency layer (cached while pom.xml is unchanged)
COPY backend/pom.xml ./pom.xml
RUN mvn -B -q dependency:go-offline
# Source layer
COPY backend/src ./src
RUN rm -f src/main/resources/application-prod.yml \
 && mvn -B -DskipTests clean package \
 && mv target/*.jar target/app.jar

FROM eclipse-temurin:21-jre-alpine AS runtime
RUN apk add --no-cache wget tzdata curl \
 && addgroup -S eduops && adduser -S eduops -G eduops
WORKDIR /app
COPY --from=build /build/target/app.jar /app/app.jar
RUN mkdir -p /app/storage && chown -R eduops:eduops /app
USER eduops
EXPOSE 8080
ENV JAVA_OPTS="-XX:MaxRAMPercentage=75 -XX:+UseG1GC -Djava.security.egd=file:/dev/./urandom"
HEALTHCHECK --interval=15s --timeout=5s --start-period=60s --retries=12 \
  CMD wget -qO- http://localhost:8080/actuator/health || exit 1
ENTRYPOINT ["sh","-c","exec java $JAVA_OPTS -jar /app/app.jar \"$@\"","--"]
