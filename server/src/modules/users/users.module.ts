import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entity/user.entity';
import { UsersNeoRepositoryProvider} from './repository/users-repository.neo';
import { UsersNeoService } from './users.neo.service';
import { Neo4jModule } from '../neo4j/neo4j.module';
import {EventsModule} from '../events/events.module';
import {GenresModule} from '../genres/genres.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        Neo4jModule,
        EventsModule,
        GenresModule,
    ],
    controllers: [UsersController],
    providers: [
        UsersNeoRepositoryProvider,
        UsersService,
        UsersNeoService,
    ],
    exports: [UsersService, UsersNeoService],
})
export class UsersModule {}
