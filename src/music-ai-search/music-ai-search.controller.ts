import { Controller, Get, Post } from '@nestjs/common';
import { MusicAiSearchService } from '../music-ai-search/music-ai-search.service';



@Controller('music-ai-search')
export class MusicAiSearchController {
    constructor(private readonly musicAiSearchService: MusicAiSearchService) {}

    @Get('freeTextSearch')
    freeTextSearch() {
        this.musicAiSearchService.freeTextSearch()
    }

}