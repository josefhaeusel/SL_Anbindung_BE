import { Injectable, Logger } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegPath from 'ffmpeg-static';
import * as ffprobePath from 'ffprobe-static';
import * as path from 'path';

@Injectable()
export class AudioVideoService {
  private readonly logger = new Logger(AudioVideoService.name);

  public async split(inputPath: string): Promise<string> {
    const inputPathParsed = path.parse(inputPath);

    const inputPathName = path.join(inputPathParsed.dir, inputPathParsed.name);
    const inputPathExt = inputPathParsed.ext;

    const videoOutputPath = this._getVideoPath(inputPathName, inputPathExt);
    const audioOutputPath = this._getAudioPath(inputPathName, inputPathExt);

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

  public async join(
    inputVideoPath: string,
    inputAudioPath: string,
    basenameOnly = false,
  ): Promise<string> {
    this.logger.debug(`inputVideoPath: ${inputVideoPath}`);
    this.logger.debug(`inputAudioPath: ${inputAudioPath}`);

    const inputVideoPathParsed = path.parse(inputVideoPath);

    const inputVideoPathName = path.join(
      inputVideoPathParsed.dir,
      inputVideoPathParsed.name,
    );
    const inputVideoPathExt = inputVideoPathParsed.ext;

    const inputAudioPathParsed = path.parse(inputAudioPath);

    const inputAudioPathName = path.join(
      inputAudioPathParsed.dir,
      inputAudioPathParsed.name,
    );
    const inputAudioPathExt = inputAudioPathParsed.ext;

    const videoOutputPath = this._getVideoPath(
      inputVideoPathName,
      inputVideoPathExt,
    );
    const audioOutputPath = this._getAudioPath(
      inputVideoPathName,
      inputVideoPathExt,
    );

    const audioCodec = await this._getAudioCodecSettings(audioOutputPath);
    // this.logger.debug('audioCodec:');
    // this.logger.debug(audioCodec);

    return new Promise((resolve, reject) => {
      ffmpeg()
        .addInput(videoOutputPath)
        .addInput(inputAudioPath)
        .addOptions(['-map 0:v', '-map 1:a', '-c:v copy'])
        .audioCodec(audioCodec.codec_name)
        .format(inputVideoPathExt.replace('.', ''))
        .on('error', (error) => {
          this.logger.error('error:', error);

          reject(error);
        })
        .on('end', () => {
          this.logger.debug('Joining done');

          resolve(
            basenameOnly ? path.basename(inputVideoPath) : inputVideoPath,
          );
        })
        .saveToFile(inputVideoPath);
    });
  }

  private _getVideoPath(inputPathName: string, inputPathExt: string) {
    return `${inputPathName}-video.${inputPathExt}`;
  }

  private _getAudioPath(inputPathName: string, inputPathExt: string) {
    return `${inputPathName}-audio.${inputPathExt}`.replace(
      `${path.sep}video${path.sep}`,
      `${path.sep}audio${path.sep}`,
    );
  }

  private _getAudioCodecSettings(videoPath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(
        videoPath,
        ['-show_streams', '-select_streams', 'a'],
        (err, metadata) => {
          if (err) {
            reject(err);
          } else {
            const audioStream = metadata.streams.find(
              (stream) => stream.codec_type === 'audio',
            );
            resolve(audioStream);
          }
        },
      );
    });
  }
}
