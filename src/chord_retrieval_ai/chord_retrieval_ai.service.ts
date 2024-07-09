// src/chord-retrieval-ai/chord-retrieval-ai.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { spawn } from 'child_process';
import * as path from 'path';

@Injectable()
export class ChordRetrievalAiService {
  private readonly logger = new Logger(ChordRetrievalAiService.name);

  analyzeSong(songPath: string, animationAppended: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      const pythonPath = path.join(
        process.cwd(),
        'src/chord_retrieval_ai/py/keyfinderChildProcess.py',
      );
      this.logger.debug(`python3 ${pythonPath} ${songPath} ${animationAppended}`);

      const pythonProcess = spawn('python3', [pythonPath, songPath, animationAppended.toString()]);

      pythonProcess.stdout.on('data', (data) => {
        try {
          const result = JSON.parse(data.toString());
          resolve(result);
        } catch (error) {
          this.logger.error('error:', error);
          console.error(`error: ${error.message}`);
          reject(error);
        }
      });

      pythonProcess.stderr.on('data', (data) => {
        this.logger.warn('stderr:', data);
        console.error(`stderr: ${data}`);
      });

      pythonProcess.on('error', (error) => {
        this.logger.error('error:', error);
        console.error(`error: ${error.message}`);
        reject(error);
      });
    });
  }
}
