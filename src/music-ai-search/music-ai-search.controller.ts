import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common'
import { MusicAiSearchService } from '../music-ai-search/music-ai-search.service'
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger'
import { Csrf } from 'ncsrf/dist'
import { ResponseS12Ok } from './types/response-s12-ok'

@Controller('music-ai-search')
@ApiTags('music-ai-search')
export class MusicAiSearchController {
  private readonly logger = new Logger(MusicAiSearchController.name)

  constructor(private readonly musicAiSearchService: MusicAiSearchService) {}

  @Get('allTags')
  @Csrf()
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
  @Csrf()
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
  @Csrf()
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
  @Csrf()
  @ApiOperation({
    summary: 'Return tracks by tag search. Can be filtered by tag ids',
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
  async tagSearch(
    @Body('prompt') prompt: string,
    @Body('tagIds') tagIds: number[] = [],
  ) {
    this.logger.debug(prompt)
    this.logger.debug(tagIds)

    return await this.musicAiSearchService.tagtSearch(prompt, tagIds)
  }
}
