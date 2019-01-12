import { CreateGenreNeoDto } from '../dto/createGenre.neo.dto';

export class Genre {

    constructor();
    constructor(genre: CreateGenreNeoDto);
    constructor(genre?: any)
    {
        this.id = genre && genre.id || null;
        this.name = genre && genre.name || null;
        this.description = genre && genre.description || null;
    }

    id: string;

    name: string;

    description: string;
}
