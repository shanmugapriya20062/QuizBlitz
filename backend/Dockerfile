FROM eclipse-temurin:25-jdk

WORKDIR /app

COPY . .

RUN chmod +x demo/mvnw

RUN cd demo && ./mvnw clean package -DskipTests

EXPOSE 8080

CMD ["sh", "-c", "java -jar demo/target/*.jar --server.port=${PORT:-8080}"]
