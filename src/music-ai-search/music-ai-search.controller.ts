import { Controller, Get, Param, Post } from '@nestjs/common'
import { MusicAiSearchService } from '../music-ai-search/music-ai-search.service'
import { ApiTags } from '@nestjs/swagger'
import { Csrf } from 'ncsrf/dist'

@Controller('music-ai-search')
@ApiTags('music-ai-search')
export class MusicAiSearchController {
  constructor(private readonly musicAiSearchService: MusicAiSearchService) {}

  @Get('freeTextSearch/:prompt')
  @Csrf()
  async freeTextSearch(@Param('prompt') prompt: string) {
    let searchResults = await this.musicAiSearchService.freeTextSearch(prompt)
    searchResults = searchResults.data.freeTextSearch.edges
    return { searchResults }
  }
}
