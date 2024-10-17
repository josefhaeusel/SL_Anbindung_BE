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
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name)

  constructor(private readonly oauthService: OAuthService) {}

  @Get()
  @UseGuards(OAuthExternalProviderGuard)
  @UseFilters(OAuthExternalProviderGuardFailureFilter)
  @ApiOperation({ summary: 'Returns the authenticated user' })
  async authenticate(@Req() req, @Res() res) {
    const user = req.user
    // Implement logic to handle authenticated user
    return res.json({ message: 'Authenticated', user })
  }

  @Get('callback')
  @ApiOperation({ summary: 'Handles the oauth callback' })
  async callback(@Req() req, @Res() res) {
    return await this.oauthService.handleCallback(req, res)
  }
}
