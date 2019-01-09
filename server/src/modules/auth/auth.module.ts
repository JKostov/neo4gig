import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '../config/config.module';
import { PasswordRecovery } from './entity/password-recovery.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UsersModule, ConfigModule, TypeOrmModule.forFeature([PasswordRecovery])],
    providers: [
        { provide: 'IAuthService', useClass: AuthService },
    ],
  controllers: [AuthController],
})
export class AuthModule {}
