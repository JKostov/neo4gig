import { CreateBandNeoDto } from '../dto/createBand.neo.dto';
import { AbstractNeoEntity } from '../../../common/entity/abstract-neo-entity.';
import { User } from '../../users/entity/user.neo.entity';

export class Band extends AbstractNeoEntity {
    static readonly entityName = 'Band';
    static readonly relationships = {
        'User->': {
            relationShipName: 'HAS_MEMBER',
            property: 'members',
        },
        'User<-': {
            relationShipName: 'LIKES',
            property: 'likes',
        },
    };

    constructor();
    constructor(band: CreateBandNeoDto);
    constructor(band?: any)
    {
        super();
        this.id = band && band.id || null;
        this.name = band && band.name || null;
        this.description = band && band.description || null;
        this.members = band && band.members || [];
        this.likes = band && band.likes || [];
    }

    id: number;

    name: string;

    description: string;

    members: User[];

    likes: User[];

    static associate(entityName): object {
        if (Band.relationships === null) {
            return null;
        }

        return Band.relationships[entityName];
    }
}
