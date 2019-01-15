import { AbstractNeoRepository } from '../../../common/repository/abstract-neo-repository';
import { User } from '../entity/user.neo.entity';
import { Neo4jService } from '../../neo4j/neo4j.service';
import { Genre } from '../../genres/entity/genre.neo.entity';
import { RelationshipSide } from '../../../common/enum/neo-relationship-side.enum';
import { Band } from '../../bands/entity/band.neo.entity';

export class UsersNeoRepository extends AbstractNeoRepository {
    constructor(neo4jService: Neo4jService) {
        super(User, neo4jService);
    }

    async findSuggestedUsersByGenre(genreId: number, userId: number, limit: number = 5): Promise<User[]> {
        const { relationShipName } = Genre.associate(`${User.entityName}${RelationshipSide.ToMe}`);
        const records = await this.neo4jService.query(
            `MATCH (g:${Genre.entityName})<-[r: ${relationShipName}]-(u:${User.entityName}) ` +
            `WHERE id(g) = ${genreId} AND id(u) <> ${userId} ` +
            `RETURN u, rand() as r ` +
            `ORDER BY r ` +
            `LIMIT ${limit}`,
        );

        return super.createObjectsFromRecord(records);
    }

    async findSuggestedUsersByBand(bandId: number, userId: number, limit: number = 5): Promise<User[]> {
        const { relationShipName } = Band.associate(`${User.entityName}${RelationshipSide.ToMe}`);
        const records = await this.neo4jService.query(
            `MATCH (b:${Band.entityName})<-[r:${relationShipName}]-(u:${User.entityName}) ` +
            `WHERE id(b) = ${bandId} AND id(u) <> ${userId} ` +
            `RETURN u, rand() as r ` +
            `ORDER BY r ` +
            `LIMIT ${limit}`,
        );

        return super.createObjectsFromRecord(records);
    }
}

export const UsersNeoRepositoryProvider = {
    provide: 'UsersNeoRepository',
    inject: [Neo4jService],
    useFactory: (neo4jService: Neo4jService) => new UsersNeoRepository(neo4jService),
};
