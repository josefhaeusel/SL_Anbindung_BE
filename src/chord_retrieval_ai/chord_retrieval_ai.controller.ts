import { Controller, Post, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChordRetrievalAiService } from './chord_retrieval_ai.service';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';



@Controller('chord-retrieval-ai')
export class ChordRetrievalAiController {
  constructor(private readonly chordRetrievalAiService: ChordRetrievalAiService) {}

  @Post('uploadVideo')
  @UseInterceptors(FileInterceptor('file'))
  async videoHandler(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    try {

      //Service für Audio / Video Splitting
      //...


      // Generate temporary filename for back-end Analysis
      const tempVideoFilePath = path.join(__dirname, '../../temp_uploads/video', file.originalname);

      // Write the video buffer to new file
      fs.writeFileSync(tempVideoFilePath, file.buffer);

      const analysisResult = await this.chordRetrievalAiService.analyzeSong(tempVideoFilePath);

      //Optional: Löschen (für Video wohl erst nach rendering relevant)
      fs.unlinkSync(tempVideoFilePath);
  
      res.json(analysisResult);
    } catch (error) {
      res.status(500).send(error.message);
    }
  } 
  
}
