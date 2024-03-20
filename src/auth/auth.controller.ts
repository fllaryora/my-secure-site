import { 
    Controller,
    Body,
    Get,
    Post,
    HttpCode,
    HttpStatus,
    Request,
    UseGuards
 } from '@nestjs/common';

 import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){

    }

    //TODO use custom DTO class instead of Record 
    @Public() //avoid rejection in case of not loaded
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDTO : Record<string, any>){
        return this.authService.signIn(signInDTO.userName, signInDTO.password);
    }
    //Funciona con pepe
    //curl -X POST http://localhost:3000/auth/login -d '{"userName": "John", "password": "changeme"}' -H "Content-Type: application/json"

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() request){
        return request.user;

    }
    //curl http://localhost:3000/auth/profile
    
    //curl -X POST http://localhost:3000/auth/login -d '{"userName": "John", "password": "changeme"}' -H "Content-Type: application/json"
    //Respond ...{"access_token":"eyJhbGciOi..."}
    
    //curl http://localhost:3000/auth/profile -H "Authorization: Bearer eyJhbGciO...."

}
