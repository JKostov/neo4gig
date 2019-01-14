import { IsString } from 'class-validator';

export class CreateBandNeoDto {

    @IsString()
    readonly name: string;

    @IsString()
    readonly description: string;
}
