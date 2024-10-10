import { Injectable } from '@nestjs/common'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    let databaseDir = 'dist/database'
    if (process.env.NODE_ENV == 'production') {
      databaseDir = 'database'
    }

    return {
      type: 'mysql',
      host: process.env.DB_HOST ? process.env.DB_HOST : 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
      username: process.env.DB_USERNAME ? process.env.DB_USERNAME : 'root',
      password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : 'soundlogo',
      database: process.env.DB_DATABASE ? process.env.DB_DATABASE : 'soundlogo',
      entities: [databaseDir + '/entity/*.entity{.ts,.js}'],
      migrations: [databaseDir + '/migrations/*{.ts,.js}'],
      migrationsRun: true,
      synchronize: false,
      manualInitialization: false,
      autoLoadEntities: true,
    }
  }
}
