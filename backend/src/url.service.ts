import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { nanoid } from 'nanoid';

const SHORT_URL_HASH_LENGTH = 6; // You can adjust the length of the short URL hash as needed

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

    const shortUrlHash = nanoid(SHORT_URL_HASH_LENGTH);

    await this.prisma.url.create({
      data: {
        longUrl,
        shortUrlHash,
      },
    });

    return shortUrlHash;
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
