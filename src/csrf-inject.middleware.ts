import {
  ExecutionContext,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'
import { Response, NextFunction } from 'express'
import { OAuthExternalProviderGuard } from './auth/oauth.guard'
import axios from 'axios'

@Injectable()
export class CsrfInjectMiddleware implements NestMiddleware {
  private readonly logger = new Logger(CsrfInjectMiddleware.name)

  constructor(private readonly authGuard: OAuthExternalProviderGuard) {}

  use(req: any, res: Response, next: NextFunction) {
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; " +
        "connect-src 'self' blob: https://team.brand-dialog.telekom.com;" +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval';" + // https://unpkg.com https://cdnjs.cloudflare.com https://vjs.zencdn.net; " +
        "script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' https://team.brand-dialog.telekom.com;" + // https://unpkg.com https://cdnjs.cloudflare.com https://vjs.zencdn.net; " +
        "style-src 'self' 'unsafe-inline';" + // https://vjs.zencdn.net https://unpkg.com https://cdn.jsdelivr.net; " +
        "style-src-elem 'self' 'unsafe-inline';" + // https://vjs.zencdn.net https://unpkg.com https://cdn.jsdelivr.net; " +
        "font-src 'self' data:; " +
        "worker-src 'self' blob:; " +
        "object-src 'none'; " +
        "frame-ancestors 'none'; " +
        "img-src 'self' data:; " +
        "media-src 'self';",
    )

    if (req.originalUrl === '/') {
      this.logger.log(`url: ${req.originalUrl}`)

      // Here we're calling the guard's canActivate method
      if (!this.authGuard.canActivateByRequest(req)) {
        // res.status(401).send('Unauthorized')
        res.redirect('/auth')
        return
      }

      this.logger.debug(`env LOCAL_PROXY: ${process.env.LOCAL_PROXY}`)
      if (typeof process.env.LOCAL_PROXY !== 'undefined') {
        this.logger.log(`proxyPath: ${process.env.LOCAL_PROXY}`)

        axios.get(process.env.LOCAL_PROXY).then((response) => {
          const data = response.data
          const err = false

          this.serveResult(data, err, req, res)
        })
      } else {
        const filePath = path.join(
          __dirname,
          '..',
          // process.env.NODE_ENV == 'production' ? 'frontend' : '',
          'frontend',
          'index.html',
        )
        this.logger.log(`filePath: ${filePath}`)

        fs.readFile(filePath, 'utf8', (err, data) => {
          this.serveResult(data, err, req, res)
        })
      }
    } else {
      next()
    }
  }

  serveResult(data: any, err, req: any, res) {
    if (err) {
      throw new Error('Bad Request from Middleware')
    }
    const csrfToken = req.csrfToken()
    const htmlWithCsrf = data.replace(
      '<body>',
      `<body data-csrf-token="${csrfToken}">`,
    )

    res.setHeader('Content-Type', 'text/html; charset=UTF-8')
    res.send(htmlWithCsrf)
  }
}
