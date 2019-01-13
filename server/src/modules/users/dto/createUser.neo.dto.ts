import { IsString, IsBoolean } from 'class-validator';

export class CreateUserNeoDto {

    @IsString()
    readonly name: string;

    @IsString()
    readonly city: string;

    @IsString()
    readonly instrument: string;

    @IsBoolean()
    readonly isMusician: boolean;
}
