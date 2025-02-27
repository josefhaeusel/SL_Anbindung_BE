import { Injectable, Logger } from '@nestjs/common'
import ffmpeg from 'fluent-ffmpeg' //JH 241019
import * as path from 'path'
import * as fs from 'fs'

export interface VideoData {
  ratio: string
  width: number | null
  height: number | null
  fidelity: string
  codec_name: string | null
  codec_name_long: string | null
  extension: string | null
  profile: string | null
  pixel_format: string | null
  supported_resolution: boolean
  supported_ratio: boolean
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

  public async split(
    inputPath: string,
    convertVideo: boolean,
  ): Promise<splitFiles> {
    const audioCodec = await this._getAudioCodecSettings(inputPath)

    const inputPathParsed = path.parse(inputPath)
    const inputPathName = path.join(inputPathParsed.dir, inputPathParsed.name)
    const inputPathExt = inputPathParsed.ext

    const videoOutputPath = this._getVideoPath(
      inputPathName,
      '.mp4', // 2024-08-19 JH
      convertVideo, // 2024-08-19 JH
      true,
      false,
    )
    const audioOutputPath = this._getAudioPath(
      inputPathName,
      '.aac', // 2024-10-12 RP
      // audioCodec,
    )

    this.logger.debug(`videoOutputPath: ${videoOutputPath}`)
    this.logger.debug(`audioOutputPath: ${audioOutputPath}`)

    return new Promise((resolve, reject) => {
      this._initFfmpeg()

      ffmpeg(inputPath)
        .inputOptions(['-hwaccel auto'])
        .outputOptions([
          '-map 0:v',
          '-c:v libx264',
          '-map 0:a',
          // '-c:a copy',
          '-c:a aac',
          '-b:a 256k',
          '-pix_fmt yuv420p',
          // 2024-08-13, RP '-profile:v high',
          '-profile:v main',
          '-level 4.0',
          // 2024-08-13, RP '-refs 1',
          '-r 25',
          // 2024-08-13, RP '-preset medium',
          '-preset faster',
        ])
        .output(videoOutputPath)
        .output(audioOutputPath)
        .on('start', (commandLine) => {
          this.logger.debug('Splitting start:', commandLine)
        })
        .on('error', (error, stdout, stderr) => {
          this.logger.error('Splitting error:', error, stderr)

          reject(error)
        })
        .on('end', () => {
          this.logger.debug('Splitting done')
          resolve({ audio: audioOutputPath, video: videoOutputPath })
          // fs.unlinkSync(inputPath)
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
        .inputOptions(['-hwaccel auto'])
        .outputOptions(['-map 0:v', '-c:v libx264', '-map 0:a', '-c:a copy'])
        .output(videoOutputPath)
        .on('start', (commandLine) => {
          this.logger.debug('Converting start:', commandLine)
        })
        .on('error', (error, stdout, stderr) => {
          this.logger.error('Converting error:', error, stderr)

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
      extension: null,
      profile: null,
      pixel_format: null,
      supported_resolution: null,
      supported_ratio: null,
      supported_length: null,
      audio: null,
      duration_ms: null,
      rotation: null,
    }

    const inputPathParsed = path.parse(inputVideoPath)
    const inputPathExt = inputPathParsed.ext

    const videoStream = await this._getVideoCodecSettings(inputVideoPath)
    this.logger.debug(videoStream)
    const audioStream = await this._getAudioCodecSettings(inputVideoPath)
    this.logger.debug(audioStream)

    const resolutionRatioCheck = await this._checkResolution(videoStream)

    if (videoStream.duration == 'N/A') {
      try {
        videoStream.duration = this._parseTimecodeToSeconds(
          videoStream.tags.DURATION,
        ) //Handling for webm format
      } catch (error) {
        this.logger.error(error)
      }
    }

    videoData.supported_length = await this._checkLength(videoStream.duration)
    videoData.supported_resolution = resolutionRatioCheck.supportedResolution
    videoData.supported_ratio = resolutionRatioCheck.supportedRatio
    videoData.ratio = videoStream.display_aspect_ratio
    videoData.width = videoStream.width
    videoData.height = videoStream.height
    videoData.codec_name = videoStream.codec_name
    videoData.codec_name_long = videoStream.codec_long_name
    videoData.extension = inputPathExt
    videoData.pixel_format = videoStream.pix_fmt
    videoData.profile = videoStream.profile
    videoData.duration_ms = videoStream.duration * 1000
    videoData.rotation = videoStream.rotation
    if (audioStream) {
      videoData.audio = audioStream.codec_long_name
    }


    // 2024-10-12, honor the rotation
    if (Math.abs(videoStream.rotation) === 90) {
      this.logger.warn('rotated video detected')

      // swap width and height
      videoData.width = videoStream.height
      videoData.height = videoStream.width
    }

    if (!videoData.supported_resolution) {
      fs.unlinkSync(inputVideoPath)
      this.logger.warn(`Deleted ${inputVideoPath}`)
    } else {
      videoData.fidelity = this._getFidelity(videoStream);
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
    this.logger.debug(`videoInputPath: ${inputVideoPath}`)

    /* 2024-10-12, fixed path
    const appendAnimationPath = path.resolve(
      `.${path.sep}src${path.sep}audio-video${path.sep}animations${path.sep}noaudio${path.sep}T_outro_claim_hard_cut_${videoData.ratio}_${videoData.fidelity}.mp4`,
    )
    */

    const rootPath =
      process.env.NODE_ENV == 'production'
        ? __dirname
        : path.join(process.cwd(), 'src', 'audio-video')
    const appendAnimationPath = path.join(
      rootPath,
      'animations',
      'noaudio',
      `T_outro_claim_hard_cut_${videoData.width}x${videoData.height}.mp4`,
    )

    this.logger.debug(`appendAnimationPath: ${appendAnimationPath}`)

    return new Promise((resolve, reject) => {
      this._initFfmpeg()

      ffmpeg()
        .input(inputVideoPath)
        .input(appendAnimationPath)
        .inputOptions(['-hwaccel auto'])
        .complexFilter(
          [
            '[0:v][1:v]concat=n=2:v=1[outv]', // Concatenate only video streams
          ],
          ['outv'],
        )
        // 2024-08-13, RP .outputOptions(['-map 0:a', '-c:v libx264', '-c:a copy']) // Keep the audio from the first input and copy codec
        // 2024-08-19 JH .outputOptions(['-map 0:a', '-c:v copy', '-c:a copy']) // Keep the audio from the first input and copy codec
        .outputOptions(['-map 0:a', '-c:v libx264', '-c:a copy']) // Keep the audio from the first input and copy codec
        .on('start', (commandLine) => {
          this.logger.debug('Appending animation start:', commandLine)
        })
        .on('error', (error, stdout, stderr) => {
          this.logger.error('Appending animation error:', error, stderr)
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
    const outputVideoPathParsed = path.parse(outputVideoPath)

    this.logger.debug(`inputAudioPath: ${inputAudioPath}`)

    const inputVideoPathName = path.join(
      outputVideoPathParsed.dir,
      outputVideoPathParsed.name,
    )

    const videoInputPath = this._getVideoPath(
      inputVideoPathName,
      '.mp4',
      convertedVideo,
      true,
      appendedAnimation,
    )

    const videoOutputPath = this._getVideoPath(
      inputVideoPathName,
      '.mp4',
      false,
      false,
      false,
    )

    this.logger.debug(`videoInputPath: ${videoInputPath}`)
    this.logger.debug(`videoOutputPath: ${videoOutputPath}`)

    const videoInputAudioCodec =
      await this._getAudioCodecSettings(videoInputPath)

    this.logger.debug('videoAudioCodec:')
    this.logger.debug(videoInputAudioCodec)

    return new Promise((resolve, reject) => {
      this._initFfmpeg()

      ffmpeg()
        .addInput(videoInputPath)
        .addInput(inputAudioPath)
        .inputOptions(['-hwaccel auto'])
        // 2024-08-13, RP .addOptions(['-map 0:v', '-map 1:a', '-c:v libx264'])
        .addOptions(['-map 0:v', '-map 1:a', '-c:v copy'])
        .audioCodec(videoInputAudioCodec.codec_name)
        .format('mp4')
        .on('start', (commandLine) => {
          this.logger.debug('Joining start:', commandLine)
        })
        .on('error', (error, stdout, stderr) => {
          this.logger.error('Joining error:', error, stderr)

          reject(error)
        })
        .on('end', () => {
          this.logger.debug('Joining done')

          resolve(
            basenameOnly ? path.basename(videoOutputPath) : videoOutputPath,
          )
        })
        .saveToFile(videoOutputPath)
    })
  }

  private _checkResolution(videoStream: { width: number; height: number }) {

    const rootPath =
      process.env.NODE_ENV == 'production'
        ? __dirname
        : path.join(process.cwd(), 'src', 'audio-video')

    const animationFolderPath = path.join(
      rootPath,
      'animations',
      'noaudio',
    )

    const filenames = fs.readdirSync(animationFolderPath);
    const resolutionString = `${videoStream.width}x${videoStream.height}`;

    const matchedFiles = filenames.filter((file) => {

      const match = file.match(/(\d+)x(\d+)/);
      if (!match) return false;

      const fileResolution = `${match[1]}x${match[2]}`;
      return fileResolution === resolutionString;
    });

    let supportedResolution = matchedFiles.length > 0;
    let supportedRatio = matchedFiles.length > 0;

    return {
      supportedResolution,
      supportedRatio, 
    };
  }

  private _getFidelity(videoStream: { width: number; height: number }) {

    const rootPath =
      process.env.NODE_ENV == 'production'
        ? __dirname
        : path.join(process.cwd(), 'src', 'audio-video')

    const resolution_data_path = path.join(
      rootPath,
      'resolution_data.json'
    )

    const resolutionString = `${videoStream.width}x${videoStream.height}`;
    const resolution_json = JSON.parse(fs.readFileSync(resolution_data_path, 'utf8'));
    
    const fidelity = resolution_json[resolutionString].fidelity

    return fidelity
    
  }

  

  private _checkLength(duration) {
    return duration <= 120.0
  }

  private _parseTimecodeToSeconds(timeCode: string) {
    const [hours, minutes, secondsAndMs] = timeCode.split(':')

    const [seconds, milliseconds] = secondsAndMs.split('.')

    const hoursInSeconds = parseInt(hours, 10) * 3600
    const minutesInSeconds = parseInt(minutes, 10) * 60
    const secondsInt = parseInt(seconds, 10)
    const millisecondsFloat = parseFloat('0.' + milliseconds)

    const totalSeconds =
      hoursInSeconds + minutesInSeconds + secondsInt + millisecondsFloat

    return totalSeconds
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

    // set audio file extension
    if (audioCodec) {
      let codecName = audioCodec.codec_name
      // let codecName = audioCodec.codec_tag_string

      if (codecName.toLowerCase().includes('pcm')) {
        codecName = 'wav'
      }

      file = file.replace(inputPathExt, `.${codecName}`)
    }

    // replace blanks
    // file = file.replaceAll(' ', '_')

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


      const ffmpegPath = audioVideoPaths.ffmpegPath.default //JH 241019
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
          // this.logger.debug('Trying ffmpeg linux path: ', ffmpegLinuxPath.path)
          fs.chmodSync(ffmpegLinuxPath.path, '755')
          ffmpeg.setFfmpegPath(ffmpegLinuxPath.path)
        } catch (err) {
          this.logger.error('Error setting ffmpeg permissions: ', err)
        }
      }

      try {
        // this.logger.debug('Trying ffprobe path: ', ffprobePath.path)
        fs.chmodSync(ffprobePath.path, '755')
        ffmpeg.setFfprobePath(ffprobePath.path)
      } catch (err) {
        this.logger.warn('Failed setting ffprobe permissions: ', err)

        try {
          // this.logger.debug('Trying ffprobe linux path: ', ffprobeLinuxPath.path,)
          fs.chmodSync(ffprobeLinuxPath.path, '755')
          ffmpeg.setFfprobePath(ffprobeLinuxPath.path)
        } catch (err) {
          this.logger.error('Error setting ffprobe permissions: ', err)
        }
      }
    }
  }
}
