import {
  Controller,
  Get,
  Logger,
  Next,
  Redirect,
  Req,
  Res,
} from '@nestjs/common'
import { AppService } from './app.service'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { createProxyMiddleware } from 'http-proxy-middleware'

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name)
  private readonly proxy

  constructor(private readonly appService: AppService) {
    if (typeof process.env.LOCAL_PROXY !== 'undefined') {
      this.proxy = createProxyMiddleware({
        target: process.env.LOCAL_PROXY, // Target URL to proxy to
        changeOrigin: true,
      })
    }
  }

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
  @ApiOperation({ summary: 'Redirect for deprecated route' })
  @ApiResponse({
    status: 301,
    description: 'Redirect to /',
  })
  redirectSoundlogo() {
    /* empty redirect method */
  }

  @Get([
    '@vite/*',
    '@id/*',
    'src/*',
    'node_modules/*',
  ])
  proxyRoute(@Req() req, @Res() res, @Next() next) {
    if (typeof process.env.LOCAL_PROXY !== 'undefined') {
      this.proxy(req, res, next)
    } else {
      res.status(404).send('Not Found')
    }
  }
}
