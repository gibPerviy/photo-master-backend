import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest()
    const isAuth = request.headers.autorization === 'secret'

    console.log('Guard...')

    if (!isAuth) throw new UnauthorizedException('Not Autorized')
    return isAuth
  }
}
