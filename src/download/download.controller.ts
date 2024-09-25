import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  Req,
  Res,
  StreamableFile,
} from '@nestjs/common'
import { DownloadService } from './download.service'
import { Request, Response } from 'express'
import { Csrf } from 'ncsrf'
import { ISession } from '../chord_retrieval_ai/chord_retrieval_ai.controller'
import * as path from 'node:path'
import { FeedbackDto } from './download.dto'
import { Log } from '../database/entity/log.entity'
import { DataSource } from 'typeorm'

@Controller('download')
export class DownloadController {
  private readonly logger = new Logger(DownloadController.name)

  constructor(
    private readonly downloadService: DownloadService,
    private readonly dataSource: DataSource,
  ) {}

  @Get('streamable')
  @Csrf()
  async streamable(
    @Query('file') file: string,
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    const uploadPrefix = (request.session as ISession).uploadPrefix
    const downloadFile = path.join(uploadPrefix, file)
    this.logger.debug(downloadFile)

    const fileStream = this.downloadService.getFileStream(downloadFile)
    const fileType = this.downloadService.getFileType(downloadFile)
    const fileSize = this.downloadService.getFileSize(downloadFile)

    this.logger.debug(fileType)
    this.logger.debug(fileSize)

    return new StreamableFile(fileStream, {
      type: fileType,
      disposition: `attachment; filename="${file}"`,
      length: fileSize,
    }) // Supports Buffer and Stream
  }

  @Post('feedback')
  @Csrf()
  async feedback(
    @Body() feedbackDto: FeedbackDto,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    this.logger.debug(feedbackDto)

    const logRepository = this.dataSource.getRepository(Log)
    const uploadPrefix = (request.session as ISession).uploadPrefix

    try {
      const log = await logRepository.findOneBy({ uploadPrefix: uploadPrefix })
      if (log) {
        log.feedbackVote = feedbackDto.vote
        log.feedbackText = feedbackDto.text
        await logRepository.save(log)
      }

      response.json({ success: true, message: '' })
    } catch (error) {
      this.logger.error('Error during feedback handling', error.stack)
      response.status(500).json({ success: false, message: error.message })
    }
  }
}
