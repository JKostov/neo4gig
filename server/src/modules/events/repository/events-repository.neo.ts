import { AbstractNeoRepository } from '../../../common/repository/abstract-neo-repository';
import { Event } from '../entity/event.neo.entity';
import { Neo4jService } from '../../neo4j/neo4j.service';

class EventsNeoRepository extends AbstractNeoRepository {
    constructor(neo4jService: Neo4jService) {
        super(Event, neo4jService);
    }
}

export const EventsNeoRepositoryProvider = {
    provide: 'EventsNeoRepository',
    inject: [Neo4jService],
    useFactory: (neo4jService: Neo4jService) => new EventsNeoRepository(neo4jService),
};
