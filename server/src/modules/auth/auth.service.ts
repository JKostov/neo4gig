import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import * as moment from 'moment';
import { v4 as uuid } from 'uuid';
import { IJwtOptions } from './interfaces/auth-jwt-options.interface';
import { IAuthResponse } from './interfaces/auth-response.interface';
import { UsersService } from '../users/users.service';
import { ConfigService } from '../config/config.service';
import { IResetPassword } from './interfaces/auth-reset-password.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordRecovery } from './entity/password-recovery.entity';
import { Status } from '../users/enum/status.enum';
import { IAuthService } from './interfaces/auth-service.interface';
import {MailerProvider} from '@nest-modules/mailer';
import {User} from '../users/entity/user.entity';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        @InjectRepository(PasswordRecovery)
        private readonly passwordRecoveryRepository: Repository<PasswordRecovery>,
        @Inject('MailerProvider')
        private readonly mailerProvider: MailerProvider,
        private readonly usersService: UsersService,
        private readonly configService: ConfigService,
    ) {}

    private _options: IJwtOptions = {
        algorithm: 'HS256',
        expiresIn: '2 days',
        jwtid: this.configService.get('JWTID'),
    };

    get options(): IJwtOptions {
        return this._options;
    }

    set options(value: IJwtOptions) {
        this._options.algorithm = value.algorithm;
    }

     public async login(credentials: { email: string; password: string }): Promise<IAuthResponse> {

         const user = await this.usersService.findOne({
            where: {
                email: credentials.email,
                password: crypto.createHmac('sha256', credentials.password).digest('hex'),
            },
        });
         if (!user) throw new HttpException('User not found.', HttpStatus.NOT_FOUND);

         const payload = {
            id: user.id,
            email: user.email,
         };

         const token = await jwt.sign(payload, this.configService.get('JWTID'), this._options);

         return {
             user,
             token,
         };
    }

    public async register(credentials): Promise<void | HttpException> {

        const encryptedCredentials = {
            ...credentials,
            password: crypto.createHmac('sha256', credentials.password).digest('hex'),
            registerToken: uuid(),
        };

        const user = await this.usersService.create(encryptedCredentials);
        if (!user) throw new HttpException('Error creating new user', HttpStatus.INTERNAL_SERVER_ERROR);

        await this.mailerProvider.sendMail({
            to: `${user.email}`,
            from: 'noreply@neo4gig.com',
            subject: 'Welcome ✔',
            template: 'welcome',
            context: {
                username: `${credentials.name}`,
                link: `${this.configService.get('API')}/auth/confirm/${encryptedCredentials.registerToken}`,
            },
        });
    }

    public async forgotPassword(email: string): Promise<void | HttpException> {

        const user = await this.usersService.findOne({
            where: {
                email,
            },
        });
        if (!user) throw new HttpException('User not found.', HttpStatus.NOT_FOUND);

        const token = uuid();

        const passwordRecovery: Partial<PasswordRecovery> = {
            token,
            user,
        };

        await this.passwordRecoveryRepository.save(passwordRecovery);

        await this.mailerProvider.sendMail({
            to: `${user.email}`,
            from: 'noreply@neo4gig.com',
            subject: 'Password recovery',
            template: 'password-recovery',
            context: {
                link: `${this.configService.get('FRONTEND')}/reset-password/${token}`,
            },
        });
    }

    public async verifyToken(token: string): Promise<void | HttpException> {

        const passwordRecovery = await this.passwordRecoveryRepository.findOne({ where: { token } });

        if (!passwordRecovery) throw new HttpException('Password recovery not found.', HttpStatus.NOT_FOUND);

        const { createdAt } = passwordRecovery;

        const difference = moment.duration(moment().diff(moment(createdAt))).asHours();

        if (difference > parseInt(this.configService.get('EXPIRATION_TIME'), 10 )) {
            return new HttpException('Token expired.', HttpStatus.BAD_REQUEST);
        }
    }

    public async resetPassword(body: IResetPassword): Promise<void | HttpException> {

        const { password, token } = body;

        const passwordRecovery = await this.passwordRecoveryRepository.findOne({
            where: {
                token,
            },
            relations: ['user'],
        });

        if (!passwordRecovery) throw new HttpException('Password recovery not found.', HttpStatus.NOT_FOUND);

        const { user } = passwordRecovery;

        const updatedUser: User = {
            ...user,
            password: crypto.createHmac('sha256', password).digest('hex'),
        };

        await this.usersService.update(user.id, updatedUser);
    }

    public async confirmToken(registerToken: string): Promise<void> {

        const user = await this.usersService.findOne({ where: { registerToken } });

        const updatedUser: User = {
            ...user,
            registerToken: null,
            status: Status.Active,
        };

        await this.usersService.update(user.id, updatedUser);
    }
}
