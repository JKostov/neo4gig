import { Inject, Injectable } from '@nestjs/common';
import { CreateGenreNeoDto } from './dto/createGenre.neo.dto';
import { Genre } from './entity/genre.neo.entity';
import { IGenresNeoService } from './interfaces/genres-service.neo.interface';
import { Event } from '../events/entity/event.neo.entity';
import { User } from '../users/entity/user.neo.entity';
import { RelationshipSide } from '../../common/enum/neo-relationship-side.enum';
import * as moment from 'moment';

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

    async findGenreWithUpcomingEvents(genre: Genre): Promise<Genre> {
        const { id } = genre;
        return await this.genresNeoRepository.getRelationshipWithQuery(
            id,
            Event.entityName, RelationshipSide.ToMe,
            { dateAndTime: `> ${moment().format()}` },
        );
    }

    async findEventWithAttendingUsers(event: Event): Promise<Event> {
        const { id } = event;
        return await this.genresNeoRepository.getRelationship(id, User.entityName, RelationshipSide.ToMe);
    }

    static associate(entityName): object {
        if (Genre.relationships === null) {
            return null;
        }

        return Genre.relationships[entityName];
    }
}
