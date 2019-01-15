import { AbstractNeoRepository } from '../../../common/repository/abstract-neo-repository';
import { Event } from '../entity/event.neo.entity';
import { Neo4jService } from '../../neo4j/neo4j.service';
import { User } from '../../users/entity/user.neo.entity';
import { RelationshipSide } from '../../../common/enum/neo-relationship-side.enum';

class EventsNeoRepository extends AbstractNeoRepository {
    constructor(neo4jService: Neo4jService) {
        super(Event, neo4jService);
    }

    public async findAllWithUsers(): Promise<object[]> {
        const objects = await super.find(null);
        if (objects.length === null) {
            return null;
        }

        for (const o of objects) {
            const relship = this.classEntity.associate(`${User.entityName}${RelationshipSide.ToMe}`);
            const { relationShipName, property } = relship;

            const result = await this.neo4jService.query(
                `MATCH (n:${this.className})${RelationshipSide.ToMe}` +
                `[r:${relationShipName}]${RelationshipSide.Neutral}` +
                ` (m:${User.entityName}) WHERE id(n) = ${o['id']} RETURN m`);

            o[property] = super.createObjectsFromRecord(result, User);
        }

        return objects;
    }
}

export const EventsNeoRepositoryProvider = {
    provide: 'EventsNeoRepository',
    inject: [Neo4jService],
    useFactory: (neo4jService: Neo4jService) => new EventsNeoRepository(neo4jService),
};
