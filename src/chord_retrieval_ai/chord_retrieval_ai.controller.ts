import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChordRetrievalAiService } from './chord_retrieval_ai.service';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { AudioVideoService } from '../audio-video/audio-video.service';

@Controller('chord-retrieval-ai')
export class ChordRetrievalAiController {
  constructor(
    private readonly chordRetrievalAiService: ChordRetrievalAiService,
    private readonly audioVideoService: AudioVideoService,
  ) {}

  @Post('uploadVideo')
  @UseInterceptors(FileInterceptor('file'))
  async videoHandler(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      // Generate temporary filename for back-end Analysis
      const tempVideoFilePath = path.join(
        __dirname,
        '../../temp_uploads/video',
        file.originalname,
      );

      // Write the video buffer to new file
      fs.writeFileSync(tempVideoFilePath, file.buffer);

      //Service für Audio / Video Splitting
      //...
      let analysisResult
      try{
        const tempAudioFilePath =
        await this.audioVideoService.split(tempVideoFilePath);

        analysisResult = await this.chordRetrievalAiService.analyzeSong(tempAudioFilePath);
      } catch (error) {
        analysisResult = await this.chordRetrievalAiService.analyzeSong(tempVideoFilePath);

      }

      //Optional: Löschen (für Video wohl erst nach rendering relevant)
      fs.unlinkSync(tempVideoFilePath);

      res.json(analysisResult);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  @Post('uploadRenderedAudio')
  @UseInterceptors(FileInterceptor('file'))
  async audioHandler(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      // Generate temporary filename for back-end Analysis
      const tempAudioFilePath = path.join(
        __dirname,
        '../../temp_uploads/audio',
        file.originalname,
      );

      // Write the audio buffer to new file
      fs.writeFileSync(tempAudioFilePath, file.buffer);

      //Service für Audio / Video Merging

      //Optional: Löschen 
      fs.unlinkSync(tempAudioFilePath);

      res.json();
    } catch (error) {
      res.status(500).send(error.message);
    }
  }


}
