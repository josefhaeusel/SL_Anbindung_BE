import { registerAs } from '@nestjs/config'
import { DataSource, DataSourceOptions } from 'typeorm'
import { TypeOrmConfigService } from '../typeorm-inject.config'

const configService = new TypeOrmConfigService()
const config = configService.createTypeOrmOptions()

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions)
