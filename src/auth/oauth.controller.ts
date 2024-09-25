import {
  Controller,
  Get,
  Logger,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common'
import { OAuthExternalProviderGuard } from './oauth.guard'
import { OAuthExternalProviderGuardFailureFilter } from './oauth.filter'
import { OAuthService } from './oauth.service'

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name)

  constructor(private readonly oauthService: OAuthService) {}

  @Get()
  @UseGuards(OAuthExternalProviderGuard)
  @UseFilters(OAuthExternalProviderGuardFailureFilter)
  async authenticate(@Req() req, @Res() res) {
    const user = req.user
    // Implement logic to handle authenticated user
    return res.json({ message: 'Authenticated', user })
  }

  @Get('callback')
  async callback(@Req() req, @Res() res) {
    return await this.oauthService.handleCallback(req, res)
  }
}
