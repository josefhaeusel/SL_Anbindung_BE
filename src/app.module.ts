import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { ChordRetrievalAiModule } from './chord_retrieval_ai/chord_retrieval_ai.module';
import { AudioVideoService } from './audio-video/audio-video.service';
import { DownloadController } from './download/download.controller';
import { DownloadService } from './download/download.service';
import { ComputerVisionService } from './computer_vision/computer_vision.service';
import { MusicAiSearchModule } from './music-ai-search/music-ai-search.module';

@Module({
  imports: [
    ChordRetrievalAiModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend/soundlogo'),
      serveRoot: '/soundlogo',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend/highlight'),
      serveRoot: '/highlight',
    }),
    MusicAiSearchModule,],
  controllers: [AppController, DownloadController],
  providers: [AppService, AudioVideoService, DownloadService, ComputerVisionService],
})
export class AppModule {}
