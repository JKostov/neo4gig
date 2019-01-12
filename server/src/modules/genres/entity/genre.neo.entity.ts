import { CreateGenreNeoDto } from '../dto/createGenre.neo.dto';
import { AbstractNeoEntity } from '../../../common/entity/abstract-neo-entity.';
import { User } from '../../users/entity/user.neo.entity';
import { Event } from '../../events/entity/event.neo.entity';

export class Genre extends AbstractNeoEntity {
    static readonly entityName = 'Genre';
    static readonly relationships = {
        'User<-': {
            relationShipName: 'INTERESTED_INTO',
            property: 'followers',
        },
        'Event<-': {
            relationShipName: 'BELONGS_TO',
            property: 'events',
        },
    };

    constructor();
    constructor(genre: CreateGenreNeoDto);
    constructor(genre?: any)
    {
        super();
        this.id = genre && genre.id || null;
        this.name = genre && genre.name || null;
        this.description = genre && genre.description || null;
        this.userFollowers = genre && genre.userFollowers || [];
        this.events = genre && genre.events || [];
    }

    id: number;

    name: string;

    description: string;

    userFollowers: User[];

    events: Event[];
}
