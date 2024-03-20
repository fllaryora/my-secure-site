import { Controller,
    Body,
    Post,
    HttpCode,
    HttpStatus
 } from '@nestjs/common';

 import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){

    }

    //TODO use custom DTO class instead of Record 
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDTO : Record<string, any>){
        return this.authService.signIn(signInDTO.userName, signInDTO.password);
    }

}
