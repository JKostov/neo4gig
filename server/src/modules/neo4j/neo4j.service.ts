
import {Injectable, Inject } from '@nestjs/common';

@Injectable()
export class Neo4jService {

    constructor(@Inject('Neo4jProvider') private readonly neo4j) {}

    async query(query: string) {
        const session = this.neo4j.session();

        const result = await session.run(query);
        await session.close();
        return result.records;
    }

    async batchQuery(queries: string[]) {
        const session = this.neo4j.session();

        queries.forEach( async (query) => await session.run(query));

        await session.close();
    }
}
