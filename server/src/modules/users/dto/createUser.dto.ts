import { IsEmail, IsString, IsOptional } from 'class-validator';

export class CreateUserDto {

    @IsString()
    readonly name: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    readonly password: string;

    @IsOptional()
    @IsString()
    readonly registerToken: string;

    @IsOptional()
    @IsString()
    readonly status: string;
}
