import * as faker from 'faker';
import { INestApplication } from '@nestjs/common';
import * as stringifyObject from 'stringify-object';

export class BandSeed  {
    public static async up(app: INestApplication) {
        const neo4jService = app.get('Neo4jService');

        const query = BandSeed.getQuery();
        return neo4jService.query(query);
    }

    public static async down(app: INestApplication) {
        const neo4jService = app.get('Neo4jService');
        return neo4jService.query('MATCH (n:Band) DELETE n');
    }

    private static getQuery(): string {

        const insertJsonData = BandSeed.generateData();
        const stringData = stringifyObject(insertJsonData);

        return `WITH ${stringData} as data\n` +
            'UNWIND data.items as bands\n' +
            'FOREACH (b IN bands |\n' +
            'CREATE (band:Band {name: b.name, description: b.description})\n' +
            ')';
    }

    private static generateData(): object {
        const names = ['Iron Maiden', 'AC/DC', 'Mortal kombat', 'Metallica', 'Smak'];
        const insertData = [];

        names.forEach(name => {
            insertData.push({
                name,
                description: faker.lorem.words(),
            });
        });

        return { items: insertData };
    }
}
