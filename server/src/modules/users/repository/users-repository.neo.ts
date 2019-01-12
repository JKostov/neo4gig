import { AbstractNeoRepository } from '../../../common/repository/abstract-neo-repository';
import { User } from '../entity/user.neo.entity';
import { Neo4jService } from '../../neo4j/neo4j.service';

class UsersNeoRepository extends AbstractNeoRepository {
    private static readonly entityName = 'User';

    constructor(neo4jService: Neo4jService) {
        super(UsersNeoRepository.entityName, User, neo4jService);
    }
}

export const UsersNeoRepositoryProvider = {
    provide: 'UsersNeoRepository',
    inject: [Neo4jService],
    useFactory: (neo4jService: Neo4jService) => new UsersNeoRepository(neo4jService),
};
