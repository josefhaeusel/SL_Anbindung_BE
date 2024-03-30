import { Controller, Post, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChordRetrievalAiService } from './chord_retrieval_ai.service';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';



@Controller('chord-retrieval-ai')
export class ChordRetrievalAiController {
  constructor(private readonly chordRetrievalAiService: ChordRetrievalAiService) {}

  @Post('analyzeAudio')
  @UseInterceptors(FileInterceptor('file'))
  async analyzeSong(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    try {

      // Generate temporary filename for back-end Analysis
      const tempFilePath = path.join(__dirname, '../../temp_uploads', file.originalname);
      // Generate hard-coded filename for client-side audio buffer playback.
      const clientFilePath = path.join(__dirname, '../../client/clientUploads', 'audioBuffer.mp3'); 
  
      // Write the buffer to new file
      fs.writeFileSync(tempFilePath, file.buffer);
      fs.writeFileSync(clientFilePath, file.buffer);

      const analysisResult = await this.chordRetrievalAiService.analyzeSong(tempFilePath);
  
      //Optional: Clean up the file after analysis
      fs.unlinkSync(tempFilePath);
  
      res.json(analysisResult);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  @Post('uploadVideo')
  @UseInterceptors(FileInterceptor('file'))
  async videoHandler(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    try {

      //Service für Audio / Video Splitting

      // Generate temporary filename for back-end Analysis
      const tempAudioFilePath = path.join(__dirname, '../../temp_uploads/audio', file.originalname);
      const tempVideoFilePath = path.join(__dirname, '../../temp_uploads/video', file.originalname);

      // Write the audio buffer to new file
      fs.writeFileSync(tempAudioFilePath, file.buffer);

      const analysisResult = await this.chordRetrievalAiService.analyzeSong(tempAudioFilePath);
      //Optional: Löschen (für Video wohl erst nach rendering relevant)
      fs.unlinkSync(tempAudioFilePath);
  
      res.json(analysisResult);
    } catch (error) {
      res.status(500).send(error.message);
    }
  } 
  
}
