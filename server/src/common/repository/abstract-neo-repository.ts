import { Neo4jService } from '../../modules/neo4j/neo4j.service';
import * as stringifyObject from 'stringify-object';

export abstract class AbstractNeoRepository {
    private readonly className: string;
    private readonly classEntity;
    private readonly  neo4jService: Neo4jService;

    protected constructor(className: string, classEntity, neo4jService: Neo4jService) {
        this.className = className;
        this.classEntity = classEntity;
        this.neo4jService = neo4jService;
    }

    public async findById(id: number): Promise<object> {
        const records = await this.neo4jService.query(`MATCH (n:${this.className}) WHERE id(n) = ${id} RETURN n LIMIT 1`);

        return this.createObjectFromRecord(records);
    }

    public async findOne(query: object): Promise<object> {
        const queryString = this.createStringFromObject(query);
        const records = await this.neo4jService.query(`MATCH (n:${this.className} ${queryString}) RETURN n LIMIT 1`);

        return this.createObjectFromRecord(records);
    }

    public async find(query: object): Promise<object> {
        const queryString = this.createStringFromObject(query);
        const records = await this.neo4jService.query(`MATCH (n:${this.className} ${queryString}) RETURN n`);

        return this.createObjectsFromRecord(records);
    }

    public async save(object: object): Promise<object> {
        const objectString = this.createStringFromObject(new this.classEntity(object));
        const result = await this.neo4jService.query(`CREATE (n:${this.className} ${objectString}) RETURN n`);

        return this.createObjectFromRecord(result);
    }

    public async update(object: object): Promise<object> {
        const setProps = this.convertPropsToString(object);
        const result = await this.neo4jService.query(`MERGE (n:${this.className} {id: ${object.id}}) ON MATCH SET ${setProps} RETURN n`);

        return this.createObjectFromRecord(result);
    }

    private convertPropsToString(object) {
        const instance = new this.classEntity(object);
        let string = '';
        instance.keys().forEach((key, value) => {
            string += `n.${key} = ${value}`;
        });

        return string;
    }

    private createObjectFromRecord(records) {
        const record = records[0];

        return this.createObject(record);
    }

    private createObjectsFromRecord(records) {
        const objects = [];
        records.forEach(record => {
            const object = this.createObject(record);
            if (object !== null) {
                objects.push(object);
            }
        });

        if (objects.length === 0) {
            return null;
        }
        return objects;
    }

    private createObject(record) {
        if (record === undefined) {
            return null;
        }
        const id = parseInt(record.get(0).identity, 10);
        const props = record.get(0).properties;
        return new this.classEntity({ ...props, id });
    }

    private createStringFromObject(query: object): string {
        if (query === undefined || query === null) {
            return '';
        }
        return stringifyObject(query);
    }
}
