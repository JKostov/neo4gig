import { AbstractNeoRepository } from '../../../common/repository/abstract-neo-repository';
import { User } from '../entity/user.neo.entity';
import { Neo4jService } from '../../neo4j/neo4j.service';
import { Genre } from '../../genres/entity/genre.neo.entity';
import { RelationshipSide } from '../../../common/enum/neo-relationship-side.enum';
import { Band } from '../../bands/entity/band.neo.entity';
import {Event} from "../../events/entity/event.neo.entity";

export class UsersNeoRepository extends AbstractNeoRepository {
    constructor(neo4jService: Neo4jService) {
        super(User, neo4jService);
    }

    async findSuggestedUsersByGenre(genreId: number, userId: number, limit: number = 5): Promise<User[]> {
        const { relationShipName } = Genre.associate(`${User.entityName}${RelationshipSide.ToMe}`);
        const userRelation = User.associate(`${User.entityName}${RelationshipSide.FromMe}`);
        const records = await this.neo4jService.query(
            `MATCH (g:${Genre.entityName})<-[r: ${relationShipName}]-(u:${User.entityName}), (m:${User.entityName}) ` +
            `WHERE id(g) = ${genreId} AND id(u) <> ${userId} AND id(m) = ${userId} AND NOT (u)<-[:${userRelation.relationShipName}]-(m)`  +
            `RETURN u, rand() as r ` +
            `ORDER BY r ` +
            `LIMIT ${limit}`,
        );

        return super.createObjectsFromRecord(records);
    }

    async findSuggestedUsersByBand(bandId: number, userId: number, limit: number = 5): Promise<User[]> {
        const { relationShipName } = Band.associate(`${User.entityName}${RelationshipSide.ToMe}`);
        const userRelation = User.associate(`${User.entityName}${RelationshipSide.FromMe}`);
        const records = await this.neo4jService.query(
            `MATCH (b:${Band.entityName})<-[r:${relationShipName}]-(u:${User.entityName}), (m:${User.entityName}) ` +
            `WHERE id(b) = ${bandId} AND id(u) <> ${userId} AND id(m) = ${userId} AND NOT (u)<-[:${userRelation.relationShipName}]-(m) ` +
            `RETURN u, rand() as r ` +
            `ORDER BY r ` +
            `LIMIT ${limit}`,
        );

        console.log(`MATCH (b:${Band.entityName})<-[r:${relationShipName}]-(u:${User.entityName}), (u)-[rr:${userRelation.relationShipName}]->(m:${User.entityName}) ` +
            `WHERE id(b) = ${bandId} AND id(u) <> ${userId} AND id(m) = ${userId} AND rr IS NULL ` +
            `RETURN u, rand() as r ` +
            `ORDER BY r ` +
            `LIMIT ${limit}`);

        return super.createObjectsFromRecord(records);
    }

    async findWithFollowersFollowingGenresAndEvents(query: object): Promise<object> {
        const user = await this.findOne(query);
        if (!user) {
            return null;
        }

        const relFollowing = User.associate(`${User.entityName}${RelationshipSide.FromMe}`);
        const relFollowers = User.associate(`${User.entityName}${RelationshipSide.ToMe}`);
        const relEvents = User.associate(`${Event.entityName}${RelationshipSide.FromMe}`);
        const relGenres = User.associate(`${Genre.entityName}${RelationshipSide.FromMe}`);

        const records = await this.neo4jService.query(
          `MATCH (n:${User.entityName})-[r:${relFollowing.relationShipName}]->(following:User), ` +
            `(n)<-[rr:${relFollowers.relationShipName}]-(follower:${User.entityName}), ` +
            `(n)-[ra:${relEvents.relationShipName}]->(event:${Event.entityName}), ` +
            `(n)-[rb:${relGenres.relationShipName}]->(genre:${Genre.entityName}) ` +
            `WHERE id(n) = ${user['id']} RETURN n, following, follower, event, genre`,
        );

        const followings = {};
        const followers = {};
        const events = {};
        const genres = {};
        for (const record of records) {
            const following = this.createObjectFromData(record.get('following'));
            const follower = this.createObjectFromData(record.get('follower'));
            const event = this.createObjectFromData(record.get('event'), Event);
            const genre = this.createObjectFromData(record.get('genre'), Genre);
            if (followings[following['id']] === undefined) {
                followings[following['id']] = following;
            }
            if (followers[follower['id']] === undefined) {
                followers[follower['id']] = follower;
            }
            if (events[event['id']] === undefined) {
                events[event['id']] = event;
            }
            if (genres[genre['id']] === undefined) {
                genres[genre['id']] = genre;
            }
        }

        user[relFollowing.property] = this.convertObjectToArray(followings);
        user[relFollowers.property] = this.convertObjectToArray(followers);
        user[relEvents.property] = this.convertObjectToArray(events);
        user[relGenres.property] = this.convertObjectToArray(genres);

        return user;
    }
}

export const UsersNeoRepositoryProvider = {
    provide: 'UsersNeoRepository',
    inject: [Neo4jService],
    useFactory: (neo4jService: Neo4jService) => new UsersNeoRepository(neo4jService),
};
