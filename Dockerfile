FROM openjdk:17-alpine
WORKDIR /workspace/app

COPY target/*.jar information-security.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","information-security.jar"]