import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Res,
    Req,
    Get,
    Logger,
    Body
  } from '@nestjs/common'
  import { FileInterceptor } from '@nestjs/platform-express'
  import { Response, Request } from 'express'
  import { Session } from 'express-session'
  import * as fs from 'fs'
  import * as path from 'path'
  import { AudioVideoService } from '../audio-video/audio-video.service'
  import { ComputerVisionService } from '../computer_vision/computer_vision.service'
  import { ChordRetrievalAiService } from '../chord_retrieval_ai/chord_retrieval_ai.service'
  import { Csrf } from 'ncsrf'
  import { nanoid } from 'nanoid'
  import { DataSource } from 'typeorm'
  import { Log } from '../database/entity/log.entity'
  import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger'
  
  export interface ISession extends Session {
    tempOriginalVideoFilePath?: string
    tempAudioFilePath?: string
    convertedVideo?: boolean
    uploadPrefix?: string
  }
  
  @Controller('magenta-moments')
  @ApiTags('magenta-moments')
  export class MagentaMomentsController {
    private readonly logger = new Logger(MagentaMomentsController.name)
  
    constructor(
      private readonly audioVideoService: AudioVideoService,
      private readonly computerVisionService: ComputerVisionService,
      private readonly chordRetrievalAiService: ChordRetrievalAiService,
      private readonly dataSource: DataSource,
    ) {
      const baseDir = path.join(__dirname, '../../temp_uploads')
      const videoDir = path.join(baseDir, 'video')
      const audioDir = path.join(baseDir, 'audio')
      const tmpDir = path.join(baseDir, 'tmp')
  
      this.ensureDirectoryExists(videoDir)
      this.ensureDirectoryExists(audioDir)
      this.ensureDirectoryExists(tmpDir)
    }
  
    private ensureDirectoryExists(dirPath: string): void {
      this.logger.log(`Check dir: ${dirPath}`)
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true })
      }
    }
  
    @Get('progress')
    // @Csrf() TODO: 2024-07-11, eventsource can't use custom headers - soundlogo.js
    @ApiOperation({ summary: 'Returns the event source progress' })
    progress(@Req() request: Request, @Res() response: Response) {
      response.setHeader('Content-Type', 'text/event-stream')
      response.setHeader('Cache-Control', 'no-cache')
      response.setHeader('X-Accel-Buffering', 'no')
  
      const sendProgress = (message: string) => {
        this.logger.log(`Progress: ${message}`)
        response.write(`data: ${JSON.stringify({ message })}\n\n`)
      }
  
      request.on('close', () => {
        this.logger.log('Client connection closed')
        response.end()
      })
  
      request.app.set('sendProgress', sendProgress)
    }
  
    @Post('uploadVideo')
    @Csrf()
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({ summary: 'Uploads a video file and returns it\'s analysis' })
    @ApiSecurity('csrf')
    async videoHandler(
      @UploadedFile() file: Express.Multer.File,
      @Req() request: Request,
      @Res() response: Response,
    ) {
      // send progress
      let progress = ''
      const sendProgress = request.app.get('sendProgress')
  
      const logRepository = this.dataSource.getRepository(Log)
      const log = new Log()
      log.createdAt = new Date()
      log.userAgent = request.headers['user-agent']
  
      const uploadPrefix = nanoid(6)
      log.uploadPrefix = uploadPrefix
  
      ;(request.session as ISession).uploadPrefix = uploadPrefix
  
      const analysisResult = {
        audioAnalysis: {},
        videoAnalysis: { convertedVideo: null },
        videoOutputFile: null,
        audioOutputFile: null,
        csrfToken: null,
      }
      let audioAnalysisResult
      let videoAnalysisResult
      let tempAudioFilePath = null
  
      try {
        this.logger.log(`Starting video upload handling: ${uploadPrefix}`)
  
        const sizeMegabyte = file.size / 1024 / 1024
        const commonFilesize = () => {
          this.logger.log('Checking Filesize', `${sizeMegabyte}MB`)
          return sizeMegabyte <= 100
        }
        if (!commonFilesize()) {
          throw new Error('InvalidFilesize')
        }
  
        log.videoFileSize = sizeMegabyte
  
        const tempBaseVideoPath = path.join(
          __dirname,
          '../../temp_uploads/video',
          uploadPrefix,
        )
        if (!fs.existsSync(tempBaseVideoPath)) {
          fs.mkdirSync(tempBaseVideoPath, { recursive: true })
        }
  
        const tempBaseAudioPath = path.join(
          __dirname,
          '../../temp_uploads/audio',
          uploadPrefix,
        )
        if (!fs.existsSync(tempBaseAudioPath)) {
          fs.mkdirSync(tempBaseAudioPath, { recursive: true })
        }
  
        const tempOriginalVideoFilePath = path.join(
          tempBaseVideoPath,
          file.originalname,
        )
        log.videoFileName = file.originalname
        let tempVideoOutputFilePath
  
        this.logger.log(tempOriginalVideoFilePath)
        await fs.writeFileSync(tempOriginalVideoFilePath, file.buffer)
  
        // send progress
        progress = 'Retrieving Video Data...'
        this.logger.log(`send progress: ${progress}`)
        sendProgress(progress)
  
        // get video data
        const videoData = await this.audioVideoService.getVideoData(
          tempOriginalVideoFilePath,
        )
        this.logger.debug(videoData)
        log.videoFileMetaData = JSON.stringify(videoData)
  
        switch (true) {
          case videoData.supported_length === false:
            throw new Error('LengthNotSupported')
          case videoData.supported_resolution === false &&
            videoData.supported_ratio === false:
            throw new Error('ResolutionAndRatioNotSupported')
          case videoData.supported_resolution === false &&
            videoData.supported_ratio === true:
            throw new Error('ResolutionNotSupported')
          case videoData.supported_resolution === true &&
            videoData.supported_ratio === false:
            throw new Error('RatioNotSupported')
        }
  
        if (
          (videoData.codec_name != 'h264' && videoData.codec_name != 'h265') ||
          !tempOriginalVideoFilePath.endsWith('.mp4')
        ) {
          /* 2024-08-13, RP
          this.logger.log('Converting Video Format...')
          sendProgress('Converting Video Format...')
          tempVideoOutputFilePath = await this.audioVideoService.convert(
            tempOriginalVideoFilePath,
          )
          */
          ;(request.session as ISession).convertedVideo = true
        } else {
          tempVideoOutputFilePath = tempOriginalVideoFilePath
          ;(request.session as ISession).convertedVideo = false
        }
  
        // send progress
        progress = 'Splitting Audio from Video...'
        this.logger.log(`send progress: ${progress}`)
        sendProgress(progress)
  
        // split audio and video
        try {
          const splitFiles = await this.audioVideoService.split(
            tempOriginalVideoFilePath,
            (request.session as ISession).convertedVideo,
          )
          tempVideoOutputFilePath = splitFiles.video
          tempAudioFilePath = splitFiles.audio
        } catch (error) {
          this.logger.error('Error during audio/video splitting', error.stack)
        }
  
        // log
        log.splitVideoFile = tempVideoOutputFilePath
        log.splitAudioFile = tempAudioFilePath
  
        // send progress
        progress = 'Detecting Magenta Moments...'
        this.logger.log(`send progress: ${progress}`)
        sendProgress(progress)
  
        // analyse video
        videoAnalysisResult = await this.computerVisionService.analyzeMagentaMoments(
          tempVideoOutputFilePath,
        )
        videoAnalysisResult.inputVideoData = videoData
  
        this.logger.debug(videoAnalysisResult)
        log.videoFileAnalyze = JSON.stringify(videoAnalysisResult)
  
        // send progress
        progress = 'Retrieving Key and Loudness...'
        this.logger.log(`send progress: ${progress}`)
        sendProgress(progress)
  
        // analyse song
        if (tempAudioFilePath != null) {
          audioAnalysisResult = await this.chordRetrievalAiService.analyzeSongMagenta(
            tempAudioFilePath,
          )
        } else {
          audioAnalysisResult = await this.chordRetrievalAiService.analyzeSongMagenta(
            tempOriginalVideoFilePath,
          )
        }
  
        // log
        log.audioFileAnalyze = JSON.stringify(audioAnalysisResult)
  
        
        analysisResult.audioAnalysis = audioAnalysisResult
        analysisResult.videoAnalysis = videoAnalysisResult
        analysisResult.videoOutputFile = tempVideoOutputFilePath
        analysisResult.audioOutputFile = tempAudioFilePath
        analysisResult.videoAnalysis.convertedVideo = (
          request.session as ISession
        ).convertedVideo
        ;(request.session as ISession).tempOriginalVideoFilePath =
          tempOriginalVideoFilePath
  
        // 2024-08-13, csrf
        analysisResult.csrfToken = (request as any).csrfToken()
  
        sendProgress('Done (on server-side).')
        this.logger.log('Processing done')
  
        this.logger.log(analysisResult)
        response.json(analysisResult)
  
        // delete split audio
        // deactivated for later reuse in voiceOptimization
        // fs.unlinkSync(tempAudioFilePath)
        // this.logger.warn(`Deleted ${tempAudioFilePath}`)
  
        //Added for later reuse in voiceOptimization
        ;(request.session as ISession).tempAudioFilePath = tempAudioFilePath
  
        // log
        log.finishedAt = new Date()
        await logRepository.save(log)
  
      } catch (error) {
        this.logger.warn('Error during video handling', error.stack)
  
        // log
        log.error = JSON.stringify(error)
        log.finishedAt = new Date()
        await logRepository.save(log)
  
        if (error.message === 'InvalidFilesize') {
          response.status(400).json({ error: 'Invalid Filesize.' })
        } else if (error.message === 'LengthNotSupported') {
          response.status(400).json({ error: 'Length not supported.' })
        } else if (error.message === 'ResolutionAndRatioNotSupported') {
          response
            .status(400)
            .json({ error: 'Resolution and display ratio not supported.' })
        } else if (error.message === 'ResolutionNotSupported') {
          response.status(400).json({ error: 'Resolution not supported.' })
        } else if (error.message === 'RatioNotSupported') {
          response.status(400).json({ error: 'Display ratio not supported.' })
        } else {
          response.status(500).json({ error: error.message })
        }
      }
    }
  
  
  }
  