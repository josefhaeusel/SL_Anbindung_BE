import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { ChordRetrievalAiModule } from './chord_retrieval_ai/chord_retrieval_ai.module'
import { AudioVideoService } from './audio-video/audio-video.service'
import { DownloadController } from './download/download.controller'
import { DownloadService } from './download/download.service'
import { ComputerVisionService } from './computer_vision/computer_vision.service'
import { MusicAiSearchModule } from './music-ai-search/music-ai-search.module'
import { CsrfInjectMiddleware } from './csrf-inject.middleware'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { TypeOrmConfigService } from './typeorm-inject.config'
import { DataSource } from 'typeorm'
import { createDatabase } from 'typeorm-extension'
import { OAuthExternalProviderGuard } from './auth/oauth.guard'
import { OAuthService } from './auth/oauth.service'
import { AuthController } from './auth/oauth.controller'
import { JwtService } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ChordRetrievalAiModule,
    MusicAiSearchModule,
    ServeStaticModule.forRoot({
      rootPath: join(
        __dirname,
        '..',
        // process.env.NODE_ENV == 'production' ? 'frontend' : '',
        'frontend',
        'favicon.ico',
      ),
      serveRoot: '/favicon.ico',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(
        __dirname,
        '..',
        // process.env.NODE_ENV == 'production' ? 'frontend' : '',
        'frontend',
        'assets',
      ),
      serveRoot: '/assets',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(
        __dirname,
        '..',
        // process.env.NODE_ENV == 'production' ? 'frontend' : '',
        'frontend',
        'libs',
      ),
      serveRoot: '/libs',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(
        __dirname,
        '..',
        process.env.NODE_ENV == 'production' ? 'frontend' : '',
        'samples',
      ),
      serveRoot: '/samples',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(
        __dirname,
        '..',
        // process.env.NODE_ENV == 'production' ? 'frontend' : '',
        'temp_uploads',
      ),
      serveRoot: '/temp_uploads',
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = new DataSource(options)

        console.log(options)
        if (!(options as TypeOrmModuleOptions).manualInitialization) {
          // create database if not exists
          await createDatabase({ options })

          // init
          await dataSource.initialize()
        }

        return dataSource
      },
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController, AuthController, DownloadController],
  providers: [
    AppService,
    AudioVideoService,
    OAuthService,
    ComputerVisionService,
    DownloadService,
    JwtService,
    OAuthExternalProviderGuard,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CsrfInjectMiddleware).forRoutes('*')
  }
}
