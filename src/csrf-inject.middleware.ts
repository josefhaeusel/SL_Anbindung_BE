import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'
import { NextFunction } from 'express'

@Injectable()
export class CsrfInjectMiddleware implements NestMiddleware {
  private readonly logger = new Logger(CsrfInjectMiddleware.name)

  use(req: any, res: any, next: () => void) {
    // TODO: 2024-07-11, change url if soundlogo only
    if (req.originalUrl === '/soundlogo/') {
      this.logger.log(`Url: ${req.originalUrl}`)

      const filePath = path.join(
        __dirname,
        '..',
        process.env.NODE_ENV == 'production' ? 'frontend' : '',
        'index.html',
      )
      this.logger.log(`FilePath: ${filePath}`)

      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          throw new Error('Bad Request from Middleware')
          next()
        }
        const csrfToken = req.csrfToken()
        const htmlWithCsrf = data.replace(
          '<body>',
          `<body data-csrf-token="${csrfToken}">`,
        )
        res.setHeader('Content-Type', 'text/html; charset=UTF-8')
        res.send(htmlWithCsrf)
      })
    } else {
      next()
    }
  }
}
