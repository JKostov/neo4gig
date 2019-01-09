import {Body, Controller, Get, HttpStatus, Inject, Param, Post, Res, UsePipes, ValidationPipe} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { IResetPassword } from './interfaces/auth-reset-password.interface';
import { ConfigService } from '../config/config.service';
import {IAuthService} from './interfaces/auth-service.interface';

@Controller('auth')
export class AuthController {
    private readonly authService: IAuthService;
    constructor(
        @Inject('IAuthService') authService: IAuthService,
        private configService: ConfigService,
    ) {
        this.authService = authService;
    }

    @Post('/login')
    @UsePipes(new ValidationPipe())
    public async login(@Body() loginDto: LoginDto, @Res() res) {
        const data = await this.authService.login(loginDto);
        res.status(HttpStatus.ACCEPTED).json(data);
    }

    @Post('/register')
    @UsePipes(new ValidationPipe())
    public async register(@Body() registerDto: RegisterDto, @Res() res) {
        await this.authService.register(registerDto);
        res.status(HttpStatus.ACCEPTED).json('Welcome.Please check your email to confirm registration.');
    }

    @Post('/forgot-password')
    public async forgotPassword(@Body() body, @Res() res) {
        await this.authService.forgotPassword(body.email);
        res.status(HttpStatus.ACCEPTED).json('Password recovery email successfully sent.');
    }

    @Post('/verify-token')
    public async verifyToken(@Body() body, @Res() res) {
        await this.authService.verifyToken(body.token);
        res.status(HttpStatus.ACCEPTED).json('Token is valid.');
    }

    @Post('/reset-password')
    public async resetPassword(@Body() body: IResetPassword, @Res() res) {
        await this.authService.resetPassword(body);
        res.status(HttpStatus.ACCEPTED).json('Password successfully changed.');
    }

    @Get('/confirm/:token')
    @UsePipes(new ValidationPipe())
    public async confirmToken(@Param() param, @Res() res) {
        await this.authService.confirmToken(param.token);
        res.redirect(this.configService.get('FRONTEND'));
    }
}
