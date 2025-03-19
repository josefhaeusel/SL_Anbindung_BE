import { Body, Controller, Get, Logger, Param, Post, Res } from '@nestjs/common'
import { Response } from 'express';
import { MusicAiSearchService } from '../music-ai-search/music-ai-search.service'
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger'
import { Csrf } from 'ncsrf/dist'
import { ResponseS12Ok } from './types/response-s12-ok'

@Controller('music-ai-search')
@ApiTags('music-ai-search')
export class MusicAiSearchController {
  private readonly logger = new Logger(MusicAiSearchController.name)

  constructor(private readonly musicAiSearchService: MusicAiSearchService) { }

  @Get('allTags')
  // @Csrf()
  @ApiOperation({ summary: 'Return all tags' })
  @ApiSecurity('csrf')
  @ApiOkResponse({
    description: 'Return all tags and subtags',
    type: ResponseS12Ok,
  })
  async getAllTags() {
    return await this.musicAiSearchService.allTags([])
  }

  @Post('allTags')
  // @Csrf()
  @ApiOperation({ summary: 'Return tags by track ids' })
  @ApiSecurity('csrf')
  @ApiCreatedResponse({
    description: 'Return all tags and subtags',
    type: ResponseS12Ok,
  })
  @ApiBody({
    description: 'the track ids',
    schema: {
      type: 'object',
      properties: {
        trackIds: { type: 'array', items: { type: 'number' } },
      },
    },
    required: true,
  })
  async postAllTags(@Body('trackIds') trackIds: number[]) {
    this.logger.debug(trackIds)

    return await this.musicAiSearchService.allTags(trackIds)
  }

  @Post('freeTextSearch')
  // @Csrf()
  @ApiOperation({
    summary: 'Return tracks by free text search. Can be filtered by tag ids',
  })
  @ApiSecurity('csrf')
  @ApiCreatedResponse({
    description: 'Return all matching tracks',
    type: ResponseS12Ok,
  })
  @ApiBody({
    description: 'the prompt and optional tag ids',
    schema: {
      type: 'object',
      properties: {
        prompt: { type: 'string' },
        tagIds: { type: 'array', items: { type: 'number' } },
      },
    },
    required: true,
  })
  async freeTextSearch(
    @Body('prompt') prompt: string,
    @Body('tagIds') tagIds: number[] = [],
  ) {
    this.logger.debug(prompt)
    this.logger.debug(tagIds)

    return await this.musicAiSearchService.freeTextSearch(prompt, tagIds)

    /*
    let searchResults = await this.musicAiSearchService.freeTextSearch(prompt)
    searchResults = searchResults.data.freeTextSearch.edges
    return { searchResults }
    */
  }

  @Post('tagSearch')
  // @Csrf()
  @ApiOperation({
    summary: 'Return tracks by tag search. Can be filtered by tag ids',
  })
  // @ApiSecurity('csrf')
  @ApiCreatedResponse({
    description: 'Return all matching tracks',
    type: ResponseS12Ok,
  })
  @ApiBody({
    description: 'the prompt and optional tag ids',
    schema: {
      type: 'object',
      properties: {
        prompt: { type: 'string' },
        tagIds: { type: 'array', items: { type: 'number' } },
      },
    },
    required: true,
  })
  async tagSearch(
    @Body('prompt') prompt: string,
    @Body('tagIds') tagIds: number[] = [],
  ) {
    this.logger.debug(prompt)
    this.logger.debug(tagIds)

    return await this.musicAiSearchService.tagtSearch(prompt, tagIds)
  }


  @Post('imageData')
  // @Csrf()
  @ApiOperation({ summary: 'Get waveform svg for track id.' })
  @ApiSecurity('csrf')
  @ApiCreatedResponse({
    description: 'Returns waveform svg.',
    // type: ResponseS12Ok,
  })
  @ApiBody({
    description: 'the track id',
    schema: {
      type: 'object',
      properties: {
        trackId: { type: 'number' },
        imageType: {
          type: 'string',
          enum: ['Waveform', 'Cover'],
        },
      },
    },
    required: true,
  })
  async getImageData(
    @Body('trackId') trackId: number,
    @Body('imageType') imageType: 'Waveform' | 'Cover') {
    this.logger.debug(trackId, imageType)

    return await this.musicAiSearchService.imageData(trackId, imageType)
  }

  @Get('audioData/:trackId')
  // @Csrf()
  @ApiOperation({ summary: 'Return mp3 by track ids' })
  @ApiParam({ name: 'trackId', type: Number, description: 'The ID of the track to stream' })
  @ApiSecurity('csrf')
  @ApiCreatedResponse({
    description: 'Return audio/mpeg stream.',
    type: ResponseS12Ok,
  })
  
  async getAudioData(@Param('trackId') trackId: number, @Res() res: Response) {
    this.logger.debug(trackId)

    const { stream, contentType, contentDisposition } = await this.musicAiSearchService.audioData(trackId);

    this.logger.debug(`${contentType}, ${contentDisposition}`)

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', contentDisposition);

    stream.pipe(res);

  }

}
