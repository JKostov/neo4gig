import { AbstractNeoRepository } from '../../../common/repository/abstract-neo-repository';
import { Genre } from '../entity/genre.neo.entity';
import { Neo4jService } from '../../neo4j/neo4j.service';

class GenresNeoRepository extends AbstractNeoRepository {
    constructor(neo4jService: Neo4jService) {
        super(Genre, neo4jService);
    }
}

export const GenresNeoRepositoryProvider = {
    provide: 'GenresNeoRepository',
    inject: [Neo4jService],
    useFactory: (neo4jService: Neo4jService) => new GenresNeoRepository(neo4jService),
};
