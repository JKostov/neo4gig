import { CreateGenreNeoDto } from '../dto/createGenre.neo.dto';
import { AbstractNeoEntity } from '../../../common/entity/abstract-neo-entity.';
import { User } from '../../users/entity/user.neo.entity';

export class Genre extends AbstractNeoEntity {
    static readonly entityName = 'Genre';
    static readonly relationships = {
        'User<-': {
            relationShipName: 'INTERESTED_INTO',
            property: 'userFollowers',
            className: User,
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
        this.userFollowers = genre && genre.userFollowers || null;
        this.events = genre && genre.events || null;
    }

    id: number;

    name: string;

    description: string;

    userFollowers: User[];

    events: Event[];

    static associate(entityName): object {
        if (Genre.relationships === null) {
            return null;
        }

        return Genre.relationships[entityName];
    }
}
