import { Event } from '../entity/event.neo.entity';
import { CreateEventNeoDto } from '../dto/createEvent.neo.dto';
import { Genre } from '../../genres/entity/genre.neo.entity';

export interface IEventsNeoService {
    findAll(): Promise<Event[]>;
    findById(id: string): Promise<Event>;
    findOne(query: object): Promise<Event>;
    find(query: object): Promise<Event[]>;
    create(createEventNeoDto: CreateEventNeoDto): Promise<Event>;
    update(id: string, newValue: CreateEventNeoDto): Promise<Event | null>;
    addGenreById(currentEvent: Event, genreToAdd: Genre): Promise<Event>;
    addGenreByName(currentEvent: Event, genreToAdd: Genre): Promise<Event>;
    removeGenreById(currentEvent: Event, genreToRemove: Genre): Promise<Event>;
    removeGenreByName(currentEvent: Event, genreToRemove: Genre): Promise<Event>;
    findEventWithGenres(event: Event): Promise<Event>;
    findEventWithAttendingUsers(event: Event): Promise<Event>;
}
