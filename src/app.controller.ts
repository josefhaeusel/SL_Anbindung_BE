import { Controller, Get, Logger, Redirect } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name)

  constructor(private readonly appService: AppService) {}

  /* now in CsrfInjectMiddleware
  @Get()
  loadFrontend(@Res() res: Response): void {
    this.logger.debug(`res: ${res}`)

    res.sendFile(
      join(
        __dirname,
        '..',
        process.env.NODE_ENV == 'production' ? 'frontend' : '',
        'frontend',
        'index.html',
      ),
    )
  }
  */

  @Get('soundlogo')
  @Redirect('/', 301)
  redirectSoundlogo() {
    /* empty redirect method */
  }
}
