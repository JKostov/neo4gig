import { IsString, IsDateString } from 'class-validator';

export class CreateEventNeoDto {

    @IsString()
    readonly city: string;

    @IsDateString()
    readonly dateAndTime: string;
}
