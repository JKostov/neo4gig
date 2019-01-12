import { IsString } from 'class-validator';

export class CreateGenreNeoDto {

    @IsString()
    readonly name: string;

    @IsString()
    readonly description: string;
}
