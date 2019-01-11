
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

        const transaction = session.beginTransaction();

        queries.forEach((query) => transaction.run(query));

        try {
            transaction.commit();
        }catch(e) {
            console.log(e.toString());
            transaction.rollback();
        }

        await session.close();
    }
}
