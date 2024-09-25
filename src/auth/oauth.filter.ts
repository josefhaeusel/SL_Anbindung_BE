import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common'
import { OAuthService } from './oauth.service'

@Catch()
export class OAuthExternalProviderGuardFailureFilter
  implements ExceptionFilter
{
  private readonly logger = new Logger(
    OAuthExternalProviderGuardFailureFilter.name,
  )

  constructor(private readonly oauthService: OAuthService) {}

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    const url = await this.oauthService.getAuthorizationUrl(request)

    response.redirect(url)
  }
}
