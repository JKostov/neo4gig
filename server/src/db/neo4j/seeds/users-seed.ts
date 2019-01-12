import * as faker from 'faker';
import { INestApplication } from '@nestjs/common';
import * as stringifyObject from 'stringify-object';

export class UserSeed  {
    public static async up(app: INestApplication) {
        const neo4jService = app.get('Neo4jService');

        const query = await UserSeed.getQuery(app);
        return neo4jService.query(query);
    }

    public static async down(app: INestApplication) {
        const neo4jService = app.get('Neo4jService');
        return neo4jService.query('MATCH (n: User) DELETE n');
    }

    private static async getQuery(app: INestApplication): Promise<string> {

        const insertJsonData = await UserSeed.generateData(app);
        const stringData = stringifyObject(insertJsonData);

        return `WITH ${stringData} as data\n` +
               'UNWIND data.items as users\n' +
               'FOREACH (u IN users |\n' +
               'CREATE (user:User {name: u.name, email: u.email, isMusician: u.isMusician, instrument: u.instrument, city:u.city})\n' +
               ')';
    }

    private static async generateData(app: INestApplication): Promise<object> {
        const usersRepository = app.get('UserRepository');
        const users = await usersRepository.find();

        const instruments = ['guitar', 'drums', 'singer', 'bass guitar'];
        const cities = ['Nis', 'Belgrade', 'Pirot', 'Novi Sad'];
        const insertData = [];

        users.forEach(user => {
            const isMusician = faker.random.boolean();
            insertData.push({
                name: user.name,
                email: user.email,
                isMusician: isMusician,
                instrument: isMusician && faker.random.arrayElement(instruments),
                city: faker.random.arrayElement(cities),
            });
        });

        return { items: insertData };
    }

    private static generateGenreArray() {
        const names = ['Pop', 'Rock', 'Jazz', 'Metal', 'Hip hop', 'Country', 'Techno', 'Trance', 'Dubstep'];

    }
}
