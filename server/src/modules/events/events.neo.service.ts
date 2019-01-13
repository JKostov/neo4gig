import { Inject, Injectable } from '@nestjs/common';
import { CreateEventNeoDto } from './dto/createEvent.neo.dto';
import { Event } from './entity/event.neo.entity';
import { IEventsNeoService } from './interfaces/events-service.neo.interface';
import { Genre } from '../genres/entity/genre.neo.entity';
import { RelationshipSide } from '../../common/enum/neo-relationship-side.enum';

@Injectable()
export class EventsNeoService implements IEventsNeoService {
    constructor(
        @Inject('EventsNeoRepository') private readonly eventsNeoRepository,
    ) {}

    async findAll(): Promise<Event[]> {
        return await this.eventsNeoRepository.find();
    }

    async findById(id: string): Promise<Event> {
        return await this.eventsNeoRepository.findById(id);
    }

    async findOne(query: object): Promise<Event> {
        return await this.eventsNeoRepository.findOne(query);
    }

    async find(query: object): Promise<Event[]> {
        return await this.eventsNeoRepository.find(query);
    }

    async create(createEventNeoDto: CreateEventNeoDto): Promise<Event> {
        return await this.eventsNeoRepository.save(createEventNeoDto);
    }

    async update(id: string, newValue: CreateEventNeoDto): Promise<Event | null> {

        return await this.eventsNeoRepository.update({ ...newValue, id });
    }

    async addGenreById(currentEvent: Event, genreToAdd: Genre): Promise<Event> {
        const currentEventId = currentEvent.id;
        const genreToAddId = genreToAdd.id;

        return await this.eventsNeoRepository.createRelationship(currentEventId, genreToAddId, 'Genre');
    }

    async addGenreByName(currentEvent: Event, genreToAdd: Genre): Promise<Event> {
        const currentEventId = currentEvent.id;
        const { name } = genreToAdd;

        return await this.eventsNeoRepository.createRelationshipWithQuery(currentEventId, { name }, 'Genre');
    }

    async removeGenreById(currentEvent: Event, genreToRemove: Genre): Promise<Event> {
        const currentEventId = currentEvent.id;
        const genreToRemoveId = genreToRemove.id;

        return await this.eventsNeoRepository.deleteRelationship(currentEventId, genreToRemoveId, 'Genre');
    }

    async removeGenreByName(currentEvent: Event, genreToRemove: Genre): Promise<Event> {
        const currentEventId = currentEvent.id;
        const { name } = genreToRemove;

        return await this.eventsNeoRepository.deleteRelationshipWithQuery(currentEventId, { name }, 'Genre');
    }

    async findEventWithGenres(event: Event): Promise<Event> {
        const { id } = event;
        return await this.eventsNeoRepository.getRelationship(id, 'Genre', RelationshipSide.FromMe);
    }

    async findEventWithAttendingUsers(event: Event): Promise<Event> {
        const { id } = event;
        return await this.eventsNeoRepository.getRelationship(id, 'User', RelationshipSide.ToMe);
    }
}
