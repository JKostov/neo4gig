
import {Injectable, HttpException, HttpStatus, Inject} from '@nestjs/common';
import { CreateGenreNeoDto } from './dto/createGenre.neo.dto';
import { Genre } from './entity/genre.neo.entity';
import { IGenresNeoService } from './interfaces/genres-service.neo.interface';

@Injectable()
export class GenresNeoService implements IGenresNeoService {
    constructor(
        @Inject('GenresNeoRepository') private readonly genresNeoRepository,
    ) {}

    async findAll(): Promise<Genre[]> {
        return await this.genresNeoRepository.find();
    }

    async findById(id: string): Promise<Genre> {
        return await this.genresNeoRepository.findById(id);
    }

    async findOne(query: object): Promise<Genre> {
        return await this.genresNeoRepository.findOne(query);
    }

    async find(query: object): Promise<Genre[]> {
        return await this.genresNeoRepository.find(query);
    }

    async create(createGenreNeoDto: CreateGenreNeoDto): Promise<Genre> {
        return await this.genresNeoRepository.save(createGenreNeoDto);
    }

    async update(id: string, newValue: CreateGenreNeoDto): Promise<Genre | null> {

        return await this.genresNeoRepository.update({ ...newValue, id });
    }
}
