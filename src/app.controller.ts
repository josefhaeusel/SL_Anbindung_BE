import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    if (process.env.NODE_ENV == 'production') {
      return "Use address <a href='/soundlogo'>/soundlogo</a>"
    } else {
      return "Use address <a href='/soundlogo'>/soundlogo</a> or <a href='/highlight'>/highlight</a>"
    }
  }
}
