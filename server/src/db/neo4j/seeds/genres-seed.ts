import * as faker from 'faker';
import { INestApplication } from '@nestjs/common';
import * as stringifyObject from 'stringify-object';

export class GenreSeed  {
    public static async up(app: INestApplication) {
        const neo4jService = app.get('Neo4jService');

        const query = await GenreSeed.getQuery();
        return neo4jService.query(query);
    }

    public static async down(app: INestApplication) {
        const neo4jService = app.get('Neo4jService');
        return neo4jService.query('MATCH (n: Genre) DELETE n');
    }

    private static async getQuery(): Promise<string> {

        const insertJsonData = await GenreSeed.generateData();
        const stringData = stringifyObject(insertJsonData);

        return `WITH ${stringData} as data\n` +
            'UNWIND data.items as genres\n' +
            'FOREACH (g IN genres |\n' +
            'CREATE (genre:Genre {name: g.name, description: g.description})\n' +
            ')';
    }

    private static async generateData(): Promise<object> {
        const genres = ['Pop', 'Rock', 'Jazz', 'Metal', 'Hip hop', 'Country', 'Techno', 'Trance', 'Dubstep', 'Folk'];
        const insertData = [];

        genres.forEach(genre => {
            insertData.push({
                name: genre,
                description: faker.lorem.words(),
            });
        });

        return { items: insertData };
    }
}
