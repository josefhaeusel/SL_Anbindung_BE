import { Injectable, Logger } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegPath from 'ffmpeg-static';
import * as ffprobePath from 'ffprobe-static';
import * as path from 'path';

@Injectable()
export class AudioVideoService {
  private readonly logger = new Logger(AudioVideoService.name);

  public async split(inputPath: string): Promise<string> {
    const audioCodec = await this._getAudioCodecSettings(inputPath);

    const inputPathParsed = path.parse(inputPath);

    const inputPathName = path.join(inputPathParsed.dir, inputPathParsed.name);
    const inputPathExt = inputPathParsed.ext;

    const videoOutputPath = this._getVideoPath(inputPathName, inputPathExt);
    const audioOutputPath = this._getAudioPath(
      inputPathName,
      inputPathExt,
      audioCodec,
    );

    this.logger.debug(`videoOutputPath: ${videoOutputPath}`);
    this.logger.debug(`audioOutputPath: ${audioOutputPath}`);

    return new Promise((resolve, reject) => {
      this._initFfmpeg();

      ffmpeg(inputPath)
        .outputOptions(['-map 0:v', '-c:v copy', '-map 0:a', '-c:a copy'])
        .output(videoOutputPath)
        .output(audioOutputPath)
        .on('error', (error) => {
          this.logger.error('error:', error);

          reject(error);
        })
        .on('end', () => {
          this.logger.debug('Splitting done');

          resolve(audioOutputPath);
        })
        .run();
    });
  }

  public async join(
    outputVideoPath: string,
    inputAudioPath: string,
    basenameOnly = false,
  ): Promise<string> {
    this.logger.debug(`outputVideoPath: ${outputVideoPath}`);
    this.logger.debug(`inputAudioPath: ${inputAudioPath}`);

    const outputVideoPathParsed = path.parse(outputVideoPath);

    const inputVideoPathName = path.join(
      outputVideoPathParsed.dir,
      outputVideoPathParsed.name,
    );
    const inputVideoPathExt = outputVideoPathParsed.ext;

    /*
    const inputAudioPathParsed = path.parse(inputAudioPath);

    const inputAudioPathName = path.join(
      inputAudioPathParsed.dir,
      inputAudioPathParsed.name,
    );
    const inputAudioPathExt = inputAudioPathParsed.ext;
    */

    const videoInputPath = this._getVideoPath(
      inputVideoPathName,
      inputVideoPathExt,
    );

    const videoInputAudioCodec =
      await this._getAudioCodecSettings(videoInputPath);

    const audioOutputPath = this._getAudioPath(
      inputVideoPathName,
      inputVideoPathExt,
      videoInputAudioCodec,
    );

    this.logger.debug(`videoInputPath: ${videoInputPath}`);
    this.logger.debug(`audioOutputPath: ${audioOutputPath}`);

    const audioCodec = await this._getAudioCodecSettings(audioOutputPath);
    // this.logger.debug('audioCodec:');
    // this.logger.debug(audioCodec);
    this.logger.debug(`audioCodec: ${audioCodec.codec_name}`);

    return new Promise((resolve, reject) => {
      this._initFfmpeg();

      ffmpeg()
        .addInput(videoInputPath)
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
            basenameOnly
              ? path.basename(outputVideoPath)
              : outputVideoPath,
          );
        })
        .saveToFile(outputVideoPath);
    });
  }

  private _getVideoPath(inputPathName: string, inputPathExt: string) {
    return `${inputPathName}-video${inputPathExt}`;
  }

  private _getAudioPath(
    inputPathName: string,
    inputPathExt: string,
    audioCodec: any | null = null,
  ) {
    let file = `${inputPathName}-audio${inputPathExt}`.replace(
      `${path.sep}video${path.sep}`,
      `${path.sep}audio${path.sep}`,
    );

    if (audioCodec) {
      file = file.replace(inputPathExt, `.${audioCodec.codec_name}`);
    }

    return file;
  }

  private _getAudioCodecSettings(videoPath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._initFfmpeg();

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

  private _initFfmpeg() {
    ffmpeg.setFfmpegPath(ffmpegPath);
    ffmpeg.setFfprobePath(ffprobePath.path);
  }
}
