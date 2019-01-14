import { AbstractNeoRepository } from '../../../common/repository/abstract-neo-repository';
import { Band } from '../entity/band.neo.entity';
import { Neo4jService } from '../../neo4j/neo4j.service';

class BandsNeoRepository extends AbstractNeoRepository {
    constructor(neo4jService: Neo4jService) {
        super(Band, neo4jService);
    }
}

export const BandsNeoRepositoryProvider = {
    provide: 'BandsNeoRepository',
    inject: [Neo4jService],
    useFactory: (neo4jService: Neo4jService) => new BandsNeoRepository(neo4jService),
};
