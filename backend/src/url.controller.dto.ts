import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ShortenUrlInput {
  @ApiProperty()
  @IsString()
  longUrl: string;
}

export class ShortenUrlOutput {
  @IsString()
  shortUrlHash: string;
}
