import { Controller, Post, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChordRetrievalAiService } from './chord_retrieval_ai.service';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';



@Controller('chord-retrieval-ai')
export class ChordRetrievalAiController {
  constructor(private readonly chordRetrievalAiService: ChordRetrievalAiService) {}

  @Post('analyze')
  @UseInterceptors(FileInterceptor('file'))
  async analyzeSong(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    try {
      // Generate temporary filename
      const tempFilePath = path.join(__dirname, '../../temp_uploads', file.originalname);
      const clientFilePath = path.join(__dirname, '../../client/clientUploads', file.originalname); 
  
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
  
}
