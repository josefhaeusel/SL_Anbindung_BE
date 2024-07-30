import { Injectable, Logger } from '@nestjs/common'
import * as ffmpeg from 'fluent-ffmpeg'
/*
import * as ffprobePath from 'ffprobe-static';
import * as ffmpegPath from 'ffmpeg-static';
import * as ffprobeLinuxPath from '@ffprobe-installer/ffprobe';
import * as ffmpegLinuxPath from '@ffmpeg-installer/ffmpeg';
*/
import * as path from 'path'
import * as fs from 'fs'

export interface VideoData {
  ratio: string
  width: number | null
  height: number | null
  fidelity: string
  codec_name: string | null
  codec_name_long: string | null
  profile: string | null
  pixel_format: string | null
  supported_ratio: boolean
  supported_resolution: boolean
  supported_length: boolean
  audio: string | null
}

export interface splitFiles {
  audio: string
  video: string
}

@Injectable()
export class AudioVideoService {
  private readonly logger = new Logger(AudioVideoService.name)

  public async split(inputPath: string): Promise<splitFiles> {
    const audioCodec = await this._getAudioCodecSettings(inputPath)

    const inputPathParsed = path.parse(inputPath)

    const inputPathName = path.join(inputPathParsed.dir, inputPathParsed.name)
    const inputPathExt = inputPathParsed.ext

    const videoOutputPath = this._getVideoPath(
      inputPathName,
      inputPathExt,
      false,
      true,
      false,
    )
    const audioOutputPath = this._getAudioPath(
      inputPathName,
      inputPathExt,
      audioCodec,
    )

    this.logger.debug(`videoOutputPath: ${videoOutputPath}`)
    this.logger.debug(`audioOutputPath: ${audioOutputPath}`)

    return new Promise((resolve, reject) => {
      this._initFfmpeg()

      ffmpeg(inputPath)
        .outputOptions(['-map 0:v', '-c:v copy', '-map 0:a', '-c:a copy'])
        .output(videoOutputPath)
        .output(audioOutputPath)
        .on('error', (error) => {
          this.logger.error('error:', error)

          reject(error)
        })
        .on('end', () => {
          this.logger.debug('Splitting done')
          resolve({ audio: audioOutputPath, video: videoOutputPath })
          fs.unlinkSync(inputPath)
          this.logger.warn(`Deleted ${inputPath}`)
        })
        .run()
    })
  }

  public async convert(inputPath: string): Promise<string> {
    const inputPathParsed = path.parse(inputPath)
    const inputPathName = path.join(inputPathParsed.dir, inputPathParsed.name)
    const videoOutputPath = this._getVideoPath(
      inputPathName,
      '.mp4',
      true,
      false,
      false,
    )

    this.logger.debug(`videoOutputPath: ${videoOutputPath}`)

    return new Promise((resolve, reject) => {
      this._initFfmpeg()

      ffmpeg(inputPath)
        .outputOptions(['-pix_fmt yuv420p', '-preset medium'])
        .output(videoOutputPath)
        .on('error', (error) => {
          this.logger.error('error:', error)

          reject(error)
        })
        .on('end', () => {
          this.logger.debug('Converting done')
          resolve(videoOutputPath)
          fs.unlinkSync(inputPath)
        })
        .run()
    })
  }

  public async getVideoData(inputVideoPath: string): Promise<VideoData> {
    const videoData = {
      ratio: '',
      width: null,
      height: null,
      fidelity: '',
      codec_name: null,
      codec_name_long: null,
      profile: null,
      pixel_format: null,
      supported_ratio: null,
      supported_resolution: null,
      supported_length: null,
      audio: null,
      duration_ms: null,
    }

    const videoStream = await this._getVideoCodecSettings(inputVideoPath)
    this.logger.debug(videoStream)
    const audioStream = await this._getAudioCodecSettings(inputVideoPath)
    this.logger.debug(audioStream)

    const resolutionRatioCheck = await this._checkResolution(videoStream)
    videoData.supported_length = await this._checkLength(videoStream)

    videoData.supported_ratio = resolutionRatioCheck.supportedRatio
    videoData.supported_resolution = resolutionRatioCheck.supportedResolution
    videoData.ratio = videoStream.display_aspect_ratio.replace(':', '_')
    videoData.width = videoStream.width
    videoData.height = videoStream.height
    videoData.codec_name = videoStream.codec_name
    videoData.codec_name_long = videoStream.codec_long_name
    videoData.pixel_format = videoStream.pix_fmt
    videoData.profile = videoStream.profile
    videoData.duration_ms = videoStream.duration * 1000
    if (audioStream) {
      videoData.audio = audioStream.codec_long_name
    }

    if (videoData.width == 1080 || videoData.height == 1080) {
      videoData.fidelity = 'hd'
    } else if (videoData.width == 2160 || videoData.height == 2160) {
      videoData.fidelity = 'uhd'
    } else {
      videoData.fidelity = 'low'
    }

    if (!videoData.supported_resolution || !videoData.supported_ratio) {
      fs.unlinkSync(inputVideoPath)
      this.logger.warn(`Deleted ${inputVideoPath}`)
    }

    return new Promise((resolve) => {
      resolve(videoData)
    })
  }

  public async appendAnimation(
    inputVideoPath: string,
    videoData: any,
    basenameOnly = false,
  ): Promise<string> {
    const inputPathParsed = path.parse(inputVideoPath)

    const inputPathName = path.join(inputPathParsed.dir, inputPathParsed.name)
    const inputPathExt = inputPathParsed.ext

    const videoOutputPath = this._getVideoPath(
      inputPathName,
      inputPathExt,
      false,
      false,
      true,
    )

    const appendAnimationPath = path.resolve(
      `.${path.sep}src${path.sep}audio-video${path.sep}animations${path.sep}noaudio${path.sep}T_outro_claim_hard_cut_${videoData.ratio}_${videoData.fidelity}.mp4`,
    )

    return new Promise((resolve, reject) => {
      this._initFfmpeg()

      ffmpeg()
        .input(inputVideoPath)
        .input(appendAnimationPath)
        .complexFilter(
          [
            '[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[outv][outa]', // Concatenate both video and audio streams
          ],
          ['outv', 'outa'],
        )
        /*.outputOptions([
        '-map 0:a?', // map the audio from the first input (if it exists)
      ])*/
        .on('error', (error) => {
          this.logger.error('error:', error)
          reject(error)
        })
        .on('end', () => {
          this.logger.debug('Appending animation done:', videoOutputPath)
          resolve(
            basenameOnly ? path.basename(videoOutputPath) : videoOutputPath,
          )
          fs.unlinkSync(inputVideoPath)
          this.logger.warn(`Deleted ${inputVideoPath}`)
        })
        .save(videoOutputPath)
    })
  }

  public async join(
    outputVideoPath: string,
    inputAudioPath: string,
    basenameOnly = false,
    convertedVideo = false,
    appendedAnimation = false,
  ): Promise<string> {
    this.logger.debug(`outputVideoPath: ${outputVideoPath}`)
    this.logger.debug(`inputAudioPath: ${inputAudioPath}`)

    const outputVideoPathParsed = path.parse(outputVideoPath)

    const inputVideoPathName = path.join(
      outputVideoPathParsed.dir,
      outputVideoPathParsed.name,
    )
    const inputVideoPathExt = outputVideoPathParsed.ext

    const videoInputPath = this._getVideoPath(
      inputVideoPathName,
      inputVideoPathExt,
      convertedVideo,
      true,
      appendedAnimation,
    )

    const videoInputAudioCodec =
      await this._getAudioCodecSettings(videoInputPath)

    this.logger.debug('videoAudioCodec:')
    this.logger.debug(videoInputAudioCodec)

    this.logger.debug(`videoInputPath: ${videoInputPath}`)

    return new Promise((resolve, reject) => {
      this._initFfmpeg()

      ffmpeg()
        .addInput(videoInputPath)
        .addInput(inputAudioPath)
        .addOptions(['-map 0:v', '-map 1:a', '-c:v copy'])
        .audioCodec(videoInputAudioCodec.codec_name)
        .format(inputVideoPathExt.replace('.', ''))
        .on('error', (error) => {
          this.logger.error('error:', error)

          reject(error)
        })
        .on('end', () => {
          this.logger.debug('Joining done')

          resolve(
            basenameOnly ? path.basename(outputVideoPath) : outputVideoPath,
          )
        })
        .saveToFile(outputVideoPath)
    })
  }

  private _checkResolution(videoStream) {
    let supportedRatio = true
    let supportedResolution = true

    if (videoStream.display_aspect_ratio == 'N/A') {
      const ratio = videoStream.width / videoStream.height
      switch (ratio) {
        case 16 / 9:
          videoStream.display_aspect_ratio = '16:9'
        case 9 / 16:
          videoStream.display_aspect_ratio = '9:16'
        case 1:
          videoStream.display_aspect_ratio = '1:1'
      }
    }

    if (
      videoStream.display_aspect_ratio != '1:1' &&
      videoStream.display_aspect_ratio != '16:9' &&
      videoStream.display_aspect_ratio != '9:16'
    ) {
      supportedRatio = false
    }

    if (videoStream.width < 1080 || videoStream.height < 1080) {
      supportedResolution = false
    }

    return {
      supportedRatio: supportedRatio,
      supportedResolution: supportedResolution,
    }
  }
  private _checkLength(videoStream) {
    return (videoStream.duration <= 60.0)
  }
  private _getVideoPath(
    inputPathName: string,
    inputPathExt: string,
    convertVideo: boolean,
    splitVideo: boolean,
    appendAnimation: boolean,
  ) {
    let insertedString = ''
    if (convertVideo) {
      insertedString += '-converted'
    }
    if (splitVideo) {
      insertedString += '-split'
    }
    if (appendAnimation) {
      insertedString += '-animation'
    }

    return `${inputPathName}${insertedString}${inputPathExt}`
  }

  private _getAudioPath(
    inputPathName: string,
    inputPathExt: string,
    audioCodec: any | null = null,
  ) {
    let file = `${inputPathName}-audio${inputPathExt}`.replace(
      `${path.sep}video${path.sep}`,
      `${path.sep}audio${path.sep}`,
    )

    if (audioCodec) {
      file = file.replace(inputPathExt, `.${audioCodec.codec_name}`)
    }

    return file
  }

  private _getAudioCodecSettings(videoPath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._initFfmpeg()

      ffmpeg.ffprobe(
        videoPath,
        ['-show_streams', '-select_streams', 'a'],
        (err, metadata) => {
          if (err) {
            reject(err)
          } else {
            const audioStream = metadata.streams.find(
              (stream) => stream.codec_type === 'audio',
            )
            resolve(audioStream)
          }
        },
      )
    })
  }

  private _getVideoCodecSettings(videoPath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._initFfmpeg()

      ffmpeg.ffprobe(videoPath, (err, metadata) => {
        if (err) {
          reject(err)
        } else {
          const videoStream = metadata.streams.find(
            (stream) => stream.codec_type === 'video',
          )
          resolve(videoStream)
        }
      })
    })
  }

  private async _initFfmpeg() {
    if (process.env.NODE_ENV == 'production') {
    } else {
      const audioVideoPaths = await import('./audio-video.import')

      const ffmpegPath = audioVideoPaths.ffmpegPath
      const ffmpegLinuxPath = audioVideoPaths.ffmpegLinuxPath
      const ffprobePath = audioVideoPaths.ffprobePath
      const ffprobeLinuxPath = audioVideoPaths.ffprobeLinuxPath

      try {
        this.logger.debug('Trying ffmpeg path: ', ffmpegPath)
        fs.chmodSync(ffmpegPath as unknown as string, '755')
        ffmpeg.setFfmpegPath(ffmpegPath)
      } catch (err) {
        this.logger.warn('Failed setting ffmpeg permissions: ', err)

        try {
          this.logger.debug('Trying ffmpeg linux path: ', ffmpegLinuxPath.path)
          fs.chmodSync(ffmpegLinuxPath.path, '755')
          ffmpeg.setFfmpegPath(ffmpegLinuxPath.path)
        } catch (err) {
          this.logger.error('Error setting ffmpeg permissions: ', err)
        }
      }

      try {
        this.logger.debug('Trying ffprobe path: ', ffprobePath.path)
        fs.chmodSync(ffprobePath.path, '755')
        ffmpeg.setFfprobePath(ffprobePath.path)
      } catch (err) {
        this.logger.warn('Failed setting ffprobe permissions: ', err)

        try {
          this.logger.debug(
            'Trying ffprobe linux path: ',
            ffprobeLinuxPath.path,
          )
          fs.chmodSync(ffprobeLinuxPath.path, '755')
          ffmpeg.setFfprobePath(ffprobeLinuxPath.path)
        } catch (err) {
          this.logger.error('Error setting ffprobe permissions: ', err)
        }
      }
    }
  }
}
