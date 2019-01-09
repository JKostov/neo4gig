import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
    @IsString()
    readonly name: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    readonly password: string;
}
