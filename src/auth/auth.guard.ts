import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector) {

    }

    private extractTokenFromHeader(request: Request) : string | undefined {
        console.log(request.headers.authorization);
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        //handle the salvoconducto para las rutas privadas
        const isPublic = this.reflector.getAllAndOverride<boolean> (
            IS_PUBLIC_KEY,
             [
                context.getHandler(),
                context.getClass()
             ]);
        if(isPublic){
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if(!token) {
            console.log('No hay token');
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(
            token,
            {
                secret: jwtConstants.secret,
            }
            );
            console.log('hay payload');
            //we are assigning the payload to the request object
            //so we can accest to it during the route
            request['user'] = payload;
        } catch {
            console.log('el verify caputo');
            throw new UnauthorizedException();
        }
        return true;
    }

}