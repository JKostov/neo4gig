import * as faker from 'faker';
import { INestApplication } from '@nestjs/common';
import * as stringifyObject from 'stringify-object';
import * as moment from 'moment';

export class EventSeed  {
    public static async up(app: INestApplication) {
        const neo4jService = app.get('Neo4jService');

        const query = await EventSeed.getQuery();
        return neo4jService.query(query);
    }

    public static async down(app: INestApplication) {
        const neo4jService = app.get('Neo4jService');
        return neo4jService.query('MATCH (n: Event) DELETE n');
    }

    private static async getQuery(): Promise<string> {
        const insertJsonData = await EventSeed.generateData();
        const stringData = stringifyObject(insertJsonData);

        return `WITH ${stringData} as data\n` +
            'UNWIND data.items as events\n' +
            'FOREACH (e IN events |\n' +
            'CREATE (event:Event {city: e.city, dateAndTime: e.dateAndTime})\n' +
            ')';
    }

    private static async generateData(): Promise<object> {
        const cities = ['Nis', 'Belgrade', 'Pirot', 'Novi Sad'];
        const insertData = [];

        cities.forEach(city => {
            insertData.push({
                city,
                dateAndTime: moment(faker.date.future()).format('YYYY-MM-DD HH:mm'),
            });
        });

        return { items: insertData };
    }
}
