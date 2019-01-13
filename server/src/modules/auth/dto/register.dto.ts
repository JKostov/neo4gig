import {IsBoolean, IsEmail, IsOptional, IsString} from 'class-validator';

export class RegisterDto {
    @IsString()
    readonly name: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    readonly password: string;

    @IsString()
    readonly city: string;

    @IsBoolean()
    readonly isMusician: boolean;

    @IsString()
    @IsOptional()
    readonly instrument: string;
}
