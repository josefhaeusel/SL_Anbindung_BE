import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  Req,
  Get,
  Logger,
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
  appendedAnimation?: boolean;
  convertedVideo?: boolean;
}

@Controller('chord-retrieval-ai')
export class ChordRetrievalAiController {
  private readonly logger = new Logger(ChordRetrievalAiController.name);

  constructor(
    private readonly chordRetrievalAiService: ChordRetrievalAiService,
    private readonly audioVideoService: AudioVideoService,
    private readonly computerVisionService: ComputerVisionService,
  ) {}

  @Get('progress')
  progress(@Req() req: Request, @Res() res: Response) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('X-Accel-Buffering', 'no');

    const sendProgress = (message: string) => {
      this.logger.log(`Progress: ${message}`);
      res.write(`data: ${JSON.stringify({ message })}\n\n`);
    };

    req.on('close', () => {
      this.logger.log('Client connection closed');
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

    let analysisResult = { audioAnalysis: {}, videoAnalysis: {}, videoOutputFile: null};
    let audioAnalysisResult;
    let videoAnalysisResult;
    let tempAudioFilePath = null;
    let tempAnimationAppendedVideoFilePath;

    try {
      this.logger.log('Starting video upload handling');

      let tempVideoFilePath = path.join(
        __dirname,
        '../../temp_uploads/video',
        file.originalname,
      );

      await fs.writeFileSync(tempVideoFilePath, file.buffer);

      this.logger.log('Retrieving Video Data...');
      sendProgress('Retrieving Video Data...');
      const videoData = await this.audioVideoService.getVideoData(tempVideoFilePath)
      this.logger.debug(videoData)

      if (videoData.codec_name != "h264" && videoData.codec_name != "h265"){
        tempVideoFilePath = await this.audioVideoService.convert(tempVideoFilePath);
        (request.session as ISession).convertedVideo = true;
        this.logger.log('Converting Video Format...');
        sendProgress('Converting Video Format...');
      } else{
        (request.session as ISession).convertedVideo = false;
      }

      this.logger.log('Splitting Audio from Video...');
      sendProgress('Splitting Audio from Video...');

      try {
        tempAudioFilePath = await this.audioVideoService.split(tempVideoFilePath);
      } catch (error) {
        this.logger.error('Error during audio/video splitting', error.stack);
      }

      sendProgress('Retrieving Key and Loudness...');
      this.logger.log('Retrieving Key and Loudness...');

      if (tempAudioFilePath != null) {
        audioAnalysisResult = await this.chordRetrievalAiService.analyzeSong(tempAudioFilePath);
      } else {
        audioAnalysisResult = await this.chordRetrievalAiService.analyzeSong(tempVideoFilePath);
      }

      sendProgress('Detecting T-Outro Animation...');
      this.logger.log('Detecting T-Outro Animation...');
      videoAnalysisResult = await this.computerVisionService.analyzeVideo(tempVideoFilePath);
      videoAnalysisResult.inputVideoData = videoData;

      this.logger.debug(videoAnalysisResult)

      if (videoAnalysisResult.appendAnimation == true) {
        this.logger.log("Appending T-Outro Animation...");
        sendProgress("Appending T-Outro Animation...");
        tempVideoFilePath = await this.audioVideoService.appendAnimation(tempVideoFilePath, videoData, true)
      } else {
      }

      analysisResult.audioAnalysis = audioAnalysisResult;
      analysisResult.videoAnalysis = videoAnalysisResult;
      analysisResult.videoOutputFile = tempVideoFilePath;

      /*try {fs.unlinkSync(tempVideoFilePath);}
        catch(error){this.logger.log("Error deleting temp. video", error)}*/

      (request.session as ISession).tempVideoFilePath = tempVideoFilePath;
      (request.session as ISession).appendedAnimation = videoAnalysisResult.appendAnimation;

      sendProgress('Done.');
      this.logger.log('Processing done');
      response.json(analysisResult);
    } catch (error) {
      this.logger.error('Error during video handling', error.stack);
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
      this.logger.log('Starting audio upload handling');

      const tempAudioFilePath = path.join(
        __dirname,
        '../../temp_uploads/audio',
        file.originalname,
      );

      fs.writeFileSync(tempAudioFilePath, file.buffer);

      const appendedAnimation = (request.session as ISession).appendedAnimation;
      const tempVideoFilePath = (request.session as ISession).tempVideoFilePath;

      const renderedResult = await this.audioVideoService.join(
        tempVideoFilePath,
        tempAudioFilePath,
        true,
        appendedAnimation

      );

      //fs.unlinkSync(tempAudioFilePath);

      this.logger.log(`Audio ${tempAudioFilePath} and Video ${tempVideoFilePath} joined as ${renderedResult}`);
      response.json({ renderedResult: renderedResult });
    } catch (error) {
      this.logger.error('Error during audio handling', error.stack);
      response.status(500).json({ error: error.message });
    }
  }
}
