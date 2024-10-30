import { Module } from '@nestjs/common';
import { MagentaMomentsController } from './magenta-moments.controller';

@Module({
  controllers: [MagentaMomentsController]
})
export class MagentaMomentsModule {}
