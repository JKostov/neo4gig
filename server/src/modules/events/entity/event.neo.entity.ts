import { CreateEventNeoDto } from '../dto/createEvent.neo.dto';
import { AbstractNeoEntity } from '../../../common/entity/abstract-neo-entity.';
import { User } from '../../users/entity/user.neo.entity';
import { Genre } from '../../genres/entity/genre.neo.entity';

export class Event extends AbstractNeoEntity {
    static readonly entityName = 'Event';
    static readonly relationships = {
        'User<-': {
            relationShipName: 'ATTENDS',
            property: 'users',
        },
        'Genre->': {
            relationShipName: 'BELONGS_TO',
            property: 'genres',
            className: Genre,
        },
    };

    constructor();
    constructor(event: CreateEventNeoDto);
    constructor(event?: any)
    {
        super();
        this.id = event && event.id || null;
        this.city = event && event.city || null;
        this.dateAndTime = event && new Date(event.dateAndTime) || null;
        this.users = event && event.users || [];
        this.genres = event && event.genres || [];
    }

    id: number;

    city: string;

    dateAndTime: Date;

    users: User[];

    genres: Genre[];

    static associate(entityName): object {
        if (Event.relationships === null) {
            return null;
        }

        return Event.relationships[entityName];
    }
}
