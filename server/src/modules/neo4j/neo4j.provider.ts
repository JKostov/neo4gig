import {v1} from 'neo4j-driver';

export const Neo4jProvider = {
    provide: 'Neo4jProvider',
    useFactory: () => v1.driver('bolt://neo4j', v1.auth.basic('neo4j', 'neo4gig')),
};
