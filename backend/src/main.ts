import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // allow only our frontend to be able to communicate with the app
  app.enableCors({
    origin: process.env.FRONTEND_URL,
  });

  const config = new DocumentBuilder()
    .setTitle('Url Shortener API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('docs', app, document);

  const options: SwaggerCustomOptions = {
    explorer: true, // Set to false if you don't want Swagger UI to be interactive
    customSiteTitle: 'Your API Documentation',
    // Add custom JavaScript to manipulate Swagger UI behavior
    // customCss: fs.readFileSync('./custom.css').toString(),
    // customJs: fs.readFileSync('./src/custom.js').toString(),
    customJs: `
    document.addEventListener('DOMContentLoaded', function () {
      // Disable automatic redirection in Swagger UI
      const handleRedirection = () => {
        const execute = window.SwaggerUIBundle.ui.execute;
        window.SwaggerUIBundle.ui.execute = function () {
          if (arguments[0] === 'requestRedirect') {
            return;
          }
          return execute.apply(this, arguments);
        };
      };

      handleRedirection();
    });

  `,
  };

  SwaggerModule.setup('docs', app, document, options);

  await app.listen(4000);
}
bootstrap();
