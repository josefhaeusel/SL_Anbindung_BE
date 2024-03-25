import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ChordRetrievalAiModule } from './chord_retrieval_ai/chord_retrieval_ai.module';

@Module({
  imports: [ChordRetrievalAiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
