import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsNeoRepositoryProvider } from './repository/events-repository.neo';
import { EventsNeoService } from './events.neo.service';
import { Neo4jModule } from '../neo4j/neo4j.module';

@Module({
    imports: [
        Neo4jModule,
    ],
    controllers: [EventsController],
    providers: [
        EventsNeoRepositoryProvider,
        EventsNeoService,
    ],
    exports: [EventsNeoService],
})
export class EventsModule {}
