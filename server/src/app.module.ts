import { Module } from '@nestjs/common';
import { Neo4jModule } from './modules/neo4j/neo4j.module';
import {UsersModule} from './modules/users/users.module';
import {AuthModule} from './modules/auth/auth.module';
import {ConfigModule} from './modules/config/config.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {MailerModule} from '@nest-modules/mailer';

@Module({
  imports: [
      TypeOrmModule.forRoot(),
      MailerModule.forRoot(),
      Neo4jModule,
      UsersModule,
      AuthModule,
      ConfigModule,
  ],
})
export class AppModule {}
