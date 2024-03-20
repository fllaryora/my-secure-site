import { 
  Module,
   SetMetadata
   } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';


@Module({

  controllers: [AuthController],
  providers: [
    AuthService,
    //with this nest bind authGuard to all endpoints
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
    //So, after create the below
    //we need create a mechanism of public routes
  ],
  imports:[
    UsersModule,
    JwtModule.register({
      global:true,
      secret: jwtConstants.secret,
      signOptions: {expiresIn:'60s'},

    })
  ],
  exports:[AuthService],

})
export class AuthModule {}

