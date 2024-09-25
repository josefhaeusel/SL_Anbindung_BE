import { Injectable } from '@nestjs/common'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { Log } from './database/entity/log.entity'
import { Session } from './database/entity/session.entity'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: process.env.DB_HOST ? process.env.DB_HOST : 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
      username: process.env.DB_USERNAME ? process.env.DB_USERNAME : 'root',
      password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : 'soundlogo',
      database: process.env.DB_DATABASE ? process.env.DB_DATABASE : 'soundlogo',
      // entities: [Log, Session],
      entities: ['dist/database/entity/*.entity{.ts,.js}'],
      migrations: ['dist/database/migrations/*{.ts,.js}'],
      migrationsRun: true,
      synchronize: true, // TODO: 2024-09-25, config
      manualInitialization: false,
      autoLoadEntities: true,
    }
  }
}
