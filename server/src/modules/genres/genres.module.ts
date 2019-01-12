import { Module } from '@nestjs/common';
import { GenresController } from './genres.controller';
import { GenresNeoRepositoryProvider } from './repository/genres-repository.neo';
import { GenresNeoService } from './genres.neo.service';
import { Neo4jModule } from '../neo4j/neo4j.module';

@Module({
    imports: [
        Neo4jModule,
    ],
    controllers: [GenresController],
    providers: [
        GenresNeoRepositoryProvider,
        GenresNeoService,
    ],
})
export class UsersModule {}
