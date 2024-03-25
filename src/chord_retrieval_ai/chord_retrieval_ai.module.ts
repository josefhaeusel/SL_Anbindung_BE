import { Module } from '@nestjs/common';
import { ChordRetrievalAiController } from './chord_retrieval_ai.controller';
import { ChordRetrievalAiService } from './chord_retrieval_ai.service';


@Module({
  controllers: [ChordRetrievalAiController],
  providers:  [ChordRetrievalAiService]
})
export class ChordRetrievalAiModule {}