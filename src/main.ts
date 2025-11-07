import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("API")
    .setDescription("API docs")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api-docs", app, document);

  app.setGlobalPrefix("api");
  app.enableCors();
  await app.listen(3030);
}
bootstrap().catch((err) => {
  console.error("(main.ts)=>Failed to start server:", err);
});
