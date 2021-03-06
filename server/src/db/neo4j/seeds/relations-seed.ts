import * as faker from 'faker';
import { INestApplication } from '@nestjs/common';

export class RelationsSeed  {
    public static async up(app: INestApplication) {
        const usersNeoService = app.get('UsersNeoService');
        const genresNeoService = app.get('GenresNeoService');
        const eventsNeoService = app.get('EventsNeoService');
        const bandsNeoService = app.get('BandsNeoService');

        const users = await usersNeoService.findAll();
        const genres = await genresNeoService.findAll();
        const events = await eventsNeoService.findAll();
        const bands = await bandsNeoService.findAll();

        const promises = [];

        users.map( user => {
            let u = faker.random.arrayElement(users);
            if (u !== user) {
                promises.push(usersNeoService.followUser(user, u));
            }
            u = faker.random.arrayElement(users);
            if (u !== user) {
                promises.push(usersNeoService.followUser(user, u));
            }

            if (u.isMusician) {
                promises.push(bandsNeoService.addMember(faker.random.arrayElement(bands), u));
            } else {
                promises.push(usersNeoService.likeBand(u, faker.random.arrayElement(bands)));
            }

            promises.push(usersNeoService.followGenreById(user, faker.random.arrayElement(genres)));
            promises.push(usersNeoService.followGenreById(user, faker.random.arrayElement(genres)));
            promises.push(usersNeoService.followGenreById(user, faker.random.arrayElement(genres)));

            promises.push(usersNeoService.attendEvent(user, faker.random.arrayElement(events)));
        });

        events.forEach(async event => {
            promises.push(eventsNeoService.addGenreById(event, faker.random.arrayElement(genres)));
            promises.push(eventsNeoService.addGenreById(event, faker.random.arrayElement(genres)));
        });

        return Promise.all(promises);
    }

    public static async down(app: INestApplication) {
        const neo4jService = app.get('Neo4jService');
        return neo4jService.query('MATCH (n)-[r]->(m) DELETE r');
    }
}
