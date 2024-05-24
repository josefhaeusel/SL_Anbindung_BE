import { Injectable, Logger } from '@nestjs/common';
import { spawn } from 'child_process';
import * as path from 'path';


@Injectable()
export class ComputerVisionService {
    private readonly logger = new Logger(ComputerVisionService.name);

    analyzeVideo(videoPath: string): Promise<any> {
      return new Promise((resolve, reject) => {
        const pythonPath = path.join(
          process.cwd(),
          'src/computer_vision/py/computer_vision_child_process.py',
        );
        this.logger.debug(`python3 ${pythonPath} ${videoPath}`);
  
        const pythonProcess = spawn('python3', [pythonPath, videoPath]);
  
        pythonProcess.stdout.on('data', (data) => {
          try {
            this.logger.debug(data.toString());
            const result = JSON.parse(data.toString());
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
  
        pythonProcess.on('error', (error) => {
          this.logger.error('error:', error);
          console.error(`error: ${error.message}`);
          reject(error);
        });
      });
    }
}





