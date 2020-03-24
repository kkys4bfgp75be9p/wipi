import {NestFactory} from '@nestjs/core';
import * as rateLimit from 'express-rate-limit';
import * as compression from 'compression';
import * as helmet from 'helmet';
import {TransformInterceptor} from './interceptors/transform.interceptor';
import {HttpExceptionFilter} from './filters/http-exception.filter';
import {AppModule} from './app.module';
import {ConfigService} from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get('port');

  app.enableCors();
  app.setGlobalPrefix('/api');
  app.use(
    rateLimit({
      windowMs: 60 * 1000, // 1 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  app.use(compression()); // 启用 gzip 压缩
  app.use(helmet());
  app.useGlobalInterceptors(new TransformInterceptor()); // 正常情况下，响应值统一
  app.useGlobalFilters(new HttpExceptionFilter()); // 异常情况下，响应值统一
  await app.listen(port);
}

bootstrap();
