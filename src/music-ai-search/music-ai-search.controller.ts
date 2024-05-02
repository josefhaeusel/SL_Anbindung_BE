import { Controller, Get, Param, Post } from '@nestjs/common';
import { MusicAiSearchService } from '../music-ai-search/music-ai-search.service';



@Controller('music-ai-search')
export class MusicAiSearchController {
    constructor(private readonly musicAiSearchService: MusicAiSearchService) {}

    @Get('freeTextSearch/:prompt')
    async freeTextSearch(@Param('prompt') prompt: string) {
        const searchResult = await this.musicAiSearchService.freeTextSearch(prompt)
        console.log(searchResult)
        return {searchResult}
    }

}