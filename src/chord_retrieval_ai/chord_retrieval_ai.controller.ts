import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  Req,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChordRetrievalAiService } from './chord_retrieval_ai.service';
import { Response, Request } from 'express';
import { Session } from 'express-session';
import * as fs from 'fs';
import * as path from 'path';
import { AudioVideoService } from '../audio-video/audio-video.service';
import { ComputerVisionService } from '../computer_vision/computer_vision.service';

export interface ISession extends Session {
  tempVideoFilePath?: string;
}

@Controller('chord-retrieval-ai')
export class ChordRetrievalAiController {
  constructor(
    private readonly chordRetrievalAiService: ChordRetrievalAiService,
    private readonly audioVideoService: AudioVideoService,
    private readonly computerVisionService: ComputerVisionService,
  ) {}

  @Get('progress')
  progress(@Req() req: Request, @Res() res: Response) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const sendProgress = (message: string) => {
      res.write(`data: ${JSON.stringify({ message })}\n\n`);
    };

    req.on('close', () => {
      res.end();
    });

    req.app.set('sendProgress', sendProgress);
  }

  @Post('uploadVideo')
  @UseInterceptors(FileInterceptor('file'))
  async videoHandler(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const sendProgress = request.app.get('sendProgress');

    try {
      // Generate temporary filename for back-end Analysis
      const tempVideoFilePath = path.join(
        __dirname,
        '../../temp_uploads/video',
        file.originalname,
      );

      // Write the video buffer to new file
      fs.writeFileSync(tempVideoFilePath, file.buffer);

      // Notify client about progress
      sendProgress('Splitting Audio from Video...');

      // Service für Audio / Video Splitting
      let analysisResult = { audioAnalysis: {}, videoAnalysis: {}};
      let audioAnalysisResult;
      let videoAnalysisResult;

      try {
        const tempAudioFilePath = await this.audioVideoService.split(tempVideoFilePath);

        sendProgress('Retrieving Key and Loudness...');
        audioAnalysisResult =
          await this.chordRetrievalAiService.analyzeSong(tempAudioFilePath);
      } catch (error) {
        audioAnalysisResult =
          await this.chordRetrievalAiService.analyzeSong(tempVideoFilePath);
        console.log("ERROR",error)
      }

      sendProgress('Detecting T-Outro Animation...');
      videoAnalysisResult = await this.computerVisionService.analyzeVideo(tempVideoFilePath);

      analysisResult.audioAnalysis = audioAnalysisResult;
      analysisResult.videoAnalysis = videoAnalysisResult;

      // Optional: Löschen (für Video wohl erst nach rendering relevant)
      fs.unlinkSync(tempVideoFilePath);

      (request.session as ISession).tempVideoFilePath = tempVideoFilePath;

      sendProgress('Done.');
      response.json(analysisResult);
    } catch (error) {
      response.status(500).send(error.message);
    }
  }

  @Post('uploadRenderedAudio')
  @UseInterceptors(FileInterceptor('file'))
  async audioHandler(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request,
    @Res() response: Response,
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

      // Service für Audio / Video Merging
      let renderedResult;

      const tempVideoFilePath = (request.session as ISession).tempVideoFilePath;

      renderedResult = await this.audioVideoService.join(
        tempVideoFilePath,
        tempAudioFilePath,
        true,
      );

      // Optional: Löschen
      fs.unlinkSync(tempAudioFilePath);

      response.json({ renderedResult: renderedResult });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
}
