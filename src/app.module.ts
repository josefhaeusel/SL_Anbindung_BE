import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { ChordRetrievalAiModule } from './chord_retrieval_ai/chord_retrieval_ai.module';

@Module({
  imports: [
    ChordRetrievalAiModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
