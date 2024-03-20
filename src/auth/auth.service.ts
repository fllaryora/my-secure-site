import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService){

    }

    //no tiene function porque es un method
    async signIn(userName:string, password: string) {
        //TODO encript the password with bcrypt lib
        const user = await this.userService.findOne(userName);
        if (user?.password !== password){
            throw new UnauthorizedException();
        }
        const {passwordFromUser, ...result } = user;

        //TODO generar JWT y retornar eso en vez de result
        return result;
    }


}
