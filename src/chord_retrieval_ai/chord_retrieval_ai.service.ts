// src/chord-retrieval-ai/chord-retrieval-ai.service.ts
import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';

@Injectable()
export class ChordRetrievalAiService {
  analyzeSong(songPath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn('python3', ['src/chord_retrieval_ai/py/keyfinderChildProcess.py', songPath]);

      pythonProcess.stdout.on('data', (data) => {
        try {
          const result = JSON.parse(data.toString());
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      pythonProcess.on('error', (error) => {
        console.error(`error: ${error.message}`);
        reject(error);
      });
    });
  }
}
