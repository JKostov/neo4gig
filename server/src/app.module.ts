import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jModule } from './modules/neo4j/neo4j.module';

@Module({
  imports: [Neo4jModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
