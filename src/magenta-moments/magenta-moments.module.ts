import { Module } from '@nestjs/common';
import { MagentaMomentsController } from './magenta-moments.controller';
import { ChordRetrievalAiService } from '../chord_retrieval_ai/chord_retrieval_ai.service'
import { AudioVideoService } from '../audio-video/audio-video.service'
import { ComputerVisionService } from '../computer_vision/computer_vision.service'

@Module({
  controllers: [MagentaMomentsController],
  providers: [
    ChordRetrievalAiService,
    AudioVideoService,
    ComputerVisionService,
  ],
})
export class MagentaMomentsModule {}


