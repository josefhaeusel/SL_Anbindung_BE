
import { Body, Controller, Post, Res } from '@nestjs/common';
import { ChordRetrievalAiService } from './chord_retrieval_ai.service';
import { Response } from 'express';

@Controller('chord-retrieval-ai')
export class ChordRetrievalAiController {
  constructor(private readonly chordRetrievalAiService: ChordRetrievalAiService) {}

  @Post('analyze')
  analyzeSong(@Body('filename') filename: string, @Res() res: Response) {
    try{
      const analysisResult = this.chordRetrievalAiService.analyzeSong(filename);
      res.json(analysisResult)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
}
