import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { ChordRetrievalAiModule } from './chord_retrieval_ai/chord_retrieval_ai.module';
import { AudioVideoService } from './audio-video/audio-video.service';
import { DownloadController } from './download/download.controller';
import { DownloadService } from './download/download.service';

@Module({
  imports: [
    ChordRetrievalAiModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),],
  controllers: [AppController, DownloadController],
  providers: [AppService, AudioVideoService, DownloadService],
})
export class AppModule {}
