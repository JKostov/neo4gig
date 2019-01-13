import { Genre } from '../entity/genre.neo.entity';
import { CreateGenreNeoDto } from '../dto/createGenre.neo.dto';
import { Event } from '../../events/entity/event.neo.entity';

export interface IGenresNeoService {
    findAll(): Promise<Genre[]>;
    findById(id: string): Promise<Genre>;
    findOne(query: object): Promise<Genre>;
    find(query: object): Promise<Genre[]>;
    create(createGenreNeoDto: CreateGenreNeoDto): Promise<Genre>;
    update(id: string, newValue: CreateGenreNeoDto): Promise<Genre | null>;
    findGenreWithUpcomingEvents(genre: Genre): Promise<Genre>;
    findEventWithAttendingUsers(event: Event): Promise<Event>;
}
