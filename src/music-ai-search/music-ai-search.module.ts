import { Module } from '@nestjs/common'
import { MusicAiSearchController } from './music-ai-search.controller'
import { MusicAiSearchService } from './music-ai-search.service'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule],
  controllers: [MusicAiSearchController],
  providers: [MusicAiSearchService],
})
export class MusicAiSearchModule {}
