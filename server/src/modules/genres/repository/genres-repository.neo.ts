import { AbstractNeoRepository } from '../../../common/repository/abstract-neo-repository';
import { Genre } from '../entity/genre.neo.entity';
import { Neo4jService } from '../../neo4j/neo4j.service';

class GenresNeoRepository extends AbstractNeoRepository {
    private static readonly entityName = 'Genre';

    constructor(neo4jService: Neo4jService) {
        super(GenresNeoRepository.entityName, Genre, neo4jService);
    }
}

export const GenresNeoRepositoryProvider = {
    provide: 'GenresNeoRepository',
    inject: [Neo4jService],
    useFactory: (neo4jService: Neo4jService) => new GenresNeoRepository(neo4jService),
};
