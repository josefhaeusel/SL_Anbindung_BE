import { Injectable, Logger, Req, Res } from '@nestjs/common'
import axios from 'axios'
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class OAuthService {
  private readonly logger = new Logger(OAuthService.name)

  // constructor(private configService: ConfigService) {}

  async getAuthorizationUrl(@Req() request): Promise<string> {
    // const clientId = this.configService.get<string>(`oauth:${provider}:client_id`);
    const clientId = 'NestJsTestClient'
    // const redirectUri = encodeURIComponent(this.configService.get<string>('oauth:redirect_uri'));
    const redirectUri = encodeURI('http://localhost:3000/auth/callback')
    const scope = 'openid'
    const state = Date.now().toString()

    request.session.state = state

    // const url = `https://login.microsoftonline.com/${clientId}/oauth2/v2.0/authorize?`;
    const url =
      'http://localhost:8888/realms/telekom/protocol/openid-connect/auth?'
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: scope,
      state: state,
    })
    return `${url}${params.toString()}`
  }

  async handleCallback(@Req() req, @Res() res): Promise<void> {
    // Implement logic to exchange code for tokens
    if (
      req.query.code &&
      req.query.state &&
      req.query.state === req.session.state
    ) {
      this.logger.debug(`code: ${req.query.code}`)

      const clientId = 'NestJsTestClient'
      const clientSecret = 'your_client_secret'
      const redirectUri = encodeURI('http://localhost:3000/auth/callback')

      try {
        const params = new URLSearchParams({
          grant_type: 'authorization_code',
          code: req.query.code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
        })

        const response = await axios.post(
          'http://localhost:8888/realms/telekom/protocol/openid-connect/token',
          params.toString(), // Convert URLSearchParams to string
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        )

        /*
        for (const [key, value] of Object.entries(response.data)) {
          this.logger.debug(response data - `${key}: ${value}`)
        }
        */

        const token = response.data['id_token']

        delete req.session.state
        req.session.authorization = `Bearer ${token}`
        res.redirect('/')

        return res
      } catch (error) {
        this.logger.error(`message: ${error.message}`)
        for (const [key, value] of Object.entries(error.response.data)) {
          this.logger.error(`error - ${key}: ${value}`)
        }

        throw error.message
      }
    }

    return res.json({ message: 'TODO' })
  }
}
