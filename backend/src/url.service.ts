import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { nanoid } from 'nanoid';

const SHORT_URL_HASH_LENGTH = 6; // You can adjust the length of the short URL hash as needed
const MAX_NUMBER_OF_ATTEMPTS_BEFORE_DECLARING_FAILURE = 10; // You can adjust the length of the short URL hash as needed
const PRISMA_UNIQUE_CONSTRAINT_ERROR_CODE = 'P2002';

@Injectable()
export class UrlService {
  constructor(private readonly prisma: PrismaService) {}

  public async shortenUrl(longUrl: string): Promise<string> {
    const existingUrl = await this.prisma.url.findUnique({
      where: {
        longUrl,
      },
    });

    if (existingUrl) {
      return existingUrl.shortUrlHash;
    }

    return this.generateAndSaveShortUrlHash(longUrl);
  }

  private async generateAndSaveShortUrlHash(
    longUrl: string,
    counter: number = 0,
  ) {
    if (counter === MAX_NUMBER_OF_ATTEMPTS_BEFORE_DECLARING_FAILURE) {
      throw new Error('Generation failed after 10 attempts.');
    }

    try {
      const shortUrlHash = nanoid(SHORT_URL_HASH_LENGTH);

      await this.prisma.url.create({
        data: {
          longUrl,
          shortUrlHash,
        },
      });

      return shortUrlHash;
    } catch (err) {
      if (err.code === PRISMA_UNIQUE_CONSTRAINT_ERROR_CODE) {
        return this.generateAndSaveShortUrlHash(longUrl, ++counter);
      } else {
        throw new Error(`Unexpected error: ${err}, please try again later`);
      }
    }
  }

  public async getLongUrl(shortUrlHash: string): Promise<string | undefined> {
    const existingUrl = await this.prisma.url.findUnique({
      where: {
        shortUrlHash,
      },
    });

    return existingUrl?.longUrl;
  }
}
