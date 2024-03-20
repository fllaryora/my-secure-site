import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService){

    }

    //no tiene function porque es un method
    async signIn(
        userName:string,
        password: string
        ): Promise<{ access_token: string}> {
        //TODO encript the password with bcrypt lib
        const user = await this.userService.findOne(userName);
        if (user?.password !== password){
            throw new UnauthorizedException();
        }

        const payload = { 
            sub: user.userId,
            userName: user.userName,
        };

        return {access_token: await this.jwtService.signAsync(payload)};
    }

}
