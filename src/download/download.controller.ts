import { Controller, Get, Query, Res, StreamableFile } from '@nestjs/common';
import { DownloadService } from './download.service';

@Controller('download')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @Get('streamable')
  streamable(
    @Query('file') file: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const fileStream = this.downloadService.fileStream(file);
    // or
    // const file = this.downloadService.fileBuffer();
    return new StreamableFile(fileStream); // Supports Buffer and Stream
  }
}
