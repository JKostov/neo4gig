#!/usr/bin/env ts-node
import { NestFactory } from '@nestjs/core';
import { UserSeed } from './user-seed';
import {AppModule} from '../../../app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    let seeders = [UserSeed];
    const type = process.argv[2];

    if (type === 'down') {
        seeders = seeders.reverse();
    }

    seeders.reduce( (chain, item) =>
            chain.then(() => item[type](app)),
        Promise.resolve(),
    )
        .then(() => {
            console.log(`DB seeds successfully ran ${type}.`);
            process.exit(0);
        })
        .catch((ex) => {
            console.log(ex);
            process.exit(0);
        });
}
bootstrap();
