import * as faker from 'faker';
import { INestApplication } from '@nestjs/common';
import * as stringifyObject from 'stringify-object';
import * as moment from 'moment';

export class RelationsSeed  {
    public static async up(app: INestApplication) {
        const usersNeoService = app.get('UsersNeoService');
        const genresNeoService = app.get('GenresNeoService');
        const eventsNeoService = app.get('EventsNeoService');

        const users = await usersNeoService.findAll();
        const genres = await genresNeoService.findAll();
        const events = await eventsNeoService.findAll();

        users.forEach(async user => {
            await usersNeoService.followUser(user, faker.random.arrayElement(users));
            await usersNeoService.followUser(user, faker.random.arrayElement(users));

            await usersNeoService.followGenreById(user, faker.random.arrayElement(genres));
            await usersNeoService.followGenreById(user, faker.random.arrayElement(genres));
            await usersNeoService.followGenreById(user, faker.random.arrayElement(genres));

            await usersNeoService.attendEvent(user, faker.random.arrayElement(events));
        });

        events.forEach(async event => {
            await eventsNeoService.addGenreById(event, faker.random.arrayElement(genres));
        });
    }

    public static async down(app: INestApplication) {
        const neo4jService = app.get('Neo4jService');
        return neo4jService.query('MATCH (n)-[r]->(m) DELETE r');
    }
}
