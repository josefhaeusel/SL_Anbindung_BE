import { Injectable, Logger } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegPath from 'ffmpeg-static';
import * as ffprobePath from 'ffprobe-static';
import * as path from 'path';

@Injectable()
export class AudioVideoService {
  private readonly logger = new Logger(AudioVideoService.name);

  public split(inputPath: string): Promise<string> {
    const [inputPathName, inputPathExt] = inputPath.split('.');
    const videoOutputPath = `${inputPathName}-video.${inputPathExt}`;
    const audioOutputPath = `${inputPathName}-audio.${inputPathExt}`.replace(
      `${path.sep}video${path.sep}`,
      `${path.sep}audio${path.sep}`,
    );

    return new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .setFfmpegPath(ffmpegPath)
        .setFfprobePath(ffprobePath.path)
        .outputOptions(['-map 0:v', '-c:v copy', '-map 0:a', '-c:a copy'])
        .output(videoOutputPath)
        .output(audioOutputPath)
        .on('end', () => {
          this.logger.debug('Splitting done');

          resolve(audioOutputPath);
        })
        .on('error', (error) => {
          this.logger.error('error:', error);

          reject(error);
        })
        .run();
    });
  }
}
