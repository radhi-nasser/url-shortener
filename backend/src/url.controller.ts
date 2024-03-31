import { Controller, Post, Body, Get, Param, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import { ShortenUrlInput, ShortenUrlOutput } from './url.controller.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @ApiResponse({
    status: 201,
    description: 'Short url created.',
  })
  @Post('shorten')
  async shortenUrl(@Body() body: ShortenUrlInput): Promise<ShortenUrlOutput> {
    const shortUrlHash = await this.urlService.shortenUrl(body.longUrl);
    return { shortUrlHash };
  }

  @ApiResponse({
    status: 200,
    description: 'Long url not found.',
  })
  @ApiResponse({
    status: 301,
    description: 'Redirect to another endpoint',
  })
  @Get(':shortUrl')
  async redirectUrl(@Param('shortUrl') shortUrl: string, @Res() res: Response) {
    const longUrl = await this.urlService.getLongUrl(shortUrl);

    if (longUrl) {
      res.redirect(longUrl);
      return;
    }

    res.send('Url not found !');
  }
}
