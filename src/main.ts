import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as session from 'express-session'
import { Logger } from '@nestjs/common'
import helmet from 'helmet'
import { nestCsrf } from 'ncsrf'
import * as cookieParser from 'cookie-parser'
import { TypeormStore } from 'connect-typeorm'
import { DataSource } from 'typeorm'
import { Session } from './database/entity/session.entity'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const logger = new Logger('bootstrap')
  logger.debug(`NODE_ENV: ${process?.env?.NODE_ENV}`)

  const sessionRepo = app.get(DataSource).getRepository(Session)

  // security -csp
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          'script-src': [
            `'self'`,
            `https: 'unsafe-eval'`,
            /*
            `unpkg.com`,
            `cdnjs.cloudflare.com`,
            `vjs.zencdn.net`,
            */
          ],
          'worker-src': [`blob:`],
          'connect-src': [`'self'`, `blob:`],
          // 'require-trusted-types-for': [`'script'`],
        },
      },
    }),
  )

  // security - csrf
  app.use(cookieParser())
  app.use(
    nestCsrf({
      ttl: process.env.CSRF_TTL
        ? parseInt(process.env.CSRF_TTL, 10)
        : 2 * 60 * 60,
    }),
  )

  // session
  let sessionStore
  try {
    for (const [key, value] of Object.entries(
      app.get(DataSource).getMetadata(Session).columns,
    )) {
      logger.debug(
        `session metadata - ${key}: ${value.databaseName}`,
      )
    }

    sessionStore = new TypeormStore({
      cleanupLimit: 2,
      limitSubquery: false, // If using MariaDB.
      ttl: process.env.SESSION_TTL
        ? parseInt(process.env.SESSION_TTL, 10)
        : 8 * 60 * 60,
      onError: (store, error) => {
        logger.error(`session store on error: ${error}`)
      },
    }).connect(sessionRepo)
  } catch (error) {
    logger.error(`session store error: ${error}`)
  }

  app.use(
    session({
      secret: process.env.SESSION_SECRET
        ? process.env.SESSION_SECRET
        : 'y0ur_53cr37_k3y',
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      cookie: { secure: process.env.SESSION_SECURE === 'true' },
    }),
  )

  // start
  await app.listen(3000)
}

bootstrap()
