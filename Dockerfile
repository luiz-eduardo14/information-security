FROM maven:3.8.3-openjdk-17
WORKDIR /workspace/app

COPY information-security/target/*.jar information-security.jar

ENTRYPOINT ["java","-jar","information-security.jar"]