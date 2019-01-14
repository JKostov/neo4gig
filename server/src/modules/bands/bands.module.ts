import { Module } from '@nestjs/common';
import { BandsController } from './bands.controller';
import { BandsNeoRepositoryProvider } from './repository/bands-repository.neo';
import { BandsNeoService } from './bands.neo.service';
import { Neo4jModule } from '../neo4j/neo4j.module';

@Module({
    imports: [
        Neo4jModule,
    ],
    controllers: [BandsController],
    providers: [
        BandsNeoRepositoryProvider,
        BandsNeoService,
    ],
    exports: [BandsNeoService],
})
export class BandsModule {}
