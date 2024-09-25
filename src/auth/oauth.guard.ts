import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class OAuthAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class OAuthExternalProviderGuard implements CanActivate {
  private readonly logger = new Logger(OAuthExternalProviderGuard.name)

  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublicRoute = this.reflector.getAllAndOverride<boolean>(
      'isPublic',
      [context.getHandler(), context.getClass()],
    )
    this.logger.debug(`isPublicRoute: ${isPublicRoute}`)

    if (isPublicRoute) return true

    return this.handleOAuthFlow(context.switchToHttp().getRequest())
  }

  canActivateByRequest(req: any): boolean {
    return this.handleOAuthFlow(req)
  }

  // private handleOAuthFlow(context: ExecutionContext): boolean {
  private handleOAuthFlow(request: any): boolean {
    // const request = context // .switchToHttp().getRequest()
    // this.logger.debug(`session: ${Object.keys(request.session)}`)

    const authHeader = request.session.authorization
    // this.logger.debug(`authHeader: ${authHeader}`)

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // throw new UnauthorizedException('Authentication failed')
      this.logger.error('authorization session missing')
      return false
    }

    const token = authHeader.split(' ')[1]
    try {
      const decoded = this.jwtService.decode(token)
      for (const [key, value] of Object.entries(decoded)) {
        this.logger.debug(`decoded - ${key}: ${value}`)
      }

      return true
    } catch (error) {
      this.logger.error(error)
      throw new UnauthorizedException('Invalid token')
    }
  }
}
