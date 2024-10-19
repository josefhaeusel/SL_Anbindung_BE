import { Module } from '@nestjs/common'
import { ChordRetrievalAiController } from './chord_retrieval_ai.controller'
import { ChordRetrievalAiService } from './chord_retrieval_ai.service'
import { AudioVideoService } from '../audio-video/audio-video.service'
import { ComputerVisionService } from '../computer_vision/computer_vision.service'
import { VoiceOptimizationService } from '../voice-optimization/voice-optimization.service'

@Module({
  controllers: [ChordRetrievalAiController],
  providers: [
    ChordRetrievalAiService,
    AudioVideoService,
    ComputerVisionService,
    VoiceOptimizationService,
  ],
})
export class ChordRetrievalAiModule {}
