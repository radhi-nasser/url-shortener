import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { ConfigModule } from '@nestjs/config';
import { UrlController } from './url.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [UrlController],
  providers: [PrismaService, UrlService],
})
export class AppModule {}
