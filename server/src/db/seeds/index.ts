#!/usr/bin/env ts-node
import { NestFactory } from '@nestjs/core';
import {AppModule} from '../../app.module';
import { usersQuery } from './users-genres-events';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const neo4jService = app.get('Neo4jService');

    const type = process.argv[2];

    const queries = [usersQuery];

    try {
        if (type === 'up') {
            await neo4jService.query(usersQuery);
        } else {
            await neo4jService.query('MATCH (n) DELETE n');
        }
        console.log(`DB seeds successfully ran ${type}.`);
        process.exit(0);
    } catch(e) {
        console.log(e.toString());
        process.exit(0);
    }
}
bootstrap();
