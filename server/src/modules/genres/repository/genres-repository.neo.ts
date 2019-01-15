import { AbstractNeoRepository } from '../../../common/repository/abstract-neo-repository';
import { Genre } from '../entity/genre.neo.entity';
import { Neo4jService } from '../../neo4j/neo4j.service';
import { QueryWith } from '../../../common/entity/neo-query-with';
import { RelationshipSide } from '../../../common/enum/neo-relationship-side.enum';
import { User } from '../../users/entity/user.neo.entity';

class GenresNeoRepository extends AbstractNeoRepository {
    constructor(neo4jService: Neo4jService) {
        super(Genre, neo4jService);
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

export const GenresNeoRepositoryProvider = {
    provide: 'GenresNeoRepository',
    inject: [Neo4jService],
    useFactory: (neo4jService: Neo4jService) => new GenresNeoRepository(neo4jService),
};
