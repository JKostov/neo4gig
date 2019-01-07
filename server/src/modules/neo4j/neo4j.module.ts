import { Module } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import { Neo4jProvider} from './neo4j.provider';

@Module({
  providers: [Neo4jProvider, Neo4jService],
  exports: [Neo4jService],
})
export class Neo4jModule {}
