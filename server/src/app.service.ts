import { Injectable} from '@nestjs/common';
import {Neo4jService} from './modules/neo4j/neo4j.service';

@Injectable()
export class AppService {
    constructor( private readonly neo4jService: Neo4jService) {}

    async root(): Promise<string> {
        const data = await this.neo4jService.query(`
        CREATE (b:Album { Name : "Heavy as a Really Heavy Thing", Released : "1995" })
        RETURN b`,
        );
        return `Helo world ${data}`;
    }
}
