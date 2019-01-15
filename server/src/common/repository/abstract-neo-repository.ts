import { Neo4jService } from '../../modules/neo4j/neo4j.service';
import { RelationshipSide } from '../enum/neo-relationship-side.enum';
import * as stringifyObject from 'stringify-object';
import { User } from '../../modules/users/entity/user.neo.entity';

export abstract class AbstractNeoRepository {
    protected readonly className: string;
    protected readonly classEntity;
    protected readonly  neo4jService: Neo4jService;

    protected constructor(classEntity, neo4jService: Neo4jService) {
        this.classEntity = classEntity;
        this.neo4jService = neo4jService;
        this.className = this.classEntity.entityName;
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

    // public async findOneWith(query: object, withArray: QueryWith[]): Promise<object> {
    //     const instance = await this.findOne(query);
    //     if (instance === null) {
    //         return null;
    //     }
    //
    //     for (const relationship of withArray) {
    //         const { className, side } = relationship;
    //         const relship = this.classEntity.associate(`${className}${side}`);
    //         const { relationShipName, property } = relship;
    //
    //         const result = await this.neo4jService.query(
    //             `MATCH (n:${this.className})${side === RelationshipSide.ToMe ? RelationshipSide.ToMe : RelationshipSide.Neutral}` +
    //             `[r:${relationShipName}]${side === RelationshipSide.FromMe ? RelationshipSide.FromMe : RelationshipSide.Neutral}(m:${className})` +
    //             ` WHERE id(n) = ${instance['id']} RETURN m`);
    //
    //         instance[property] = this.createObjectsFromRecord(result, relship.className);
    //     }
    //
    //     return instance;
    // }

    public async find(query: object, skip: number = 0, limit: number = null): Promise<object[]> {
        const queryString = this.createStringFromObject(query);
        const records = await this.neo4jService.query(
            `MATCH (n:${this.className} ${queryString}) RETURN n SKIP ${skip} ${limit ? 'LIMIT ' + limit : ''}`,
        );

        return this.createObjectsFromRecord(records);
    }

    public async findAllWithUsers(): Promise<object[]> {
        const relship = this.classEntity.associate(`${User.entityName}${RelationshipSide.ToMe}`);
        const { relationShipName, property } = relship;

        const result = await this.neo4jService.query(
            `MATCH (n:${this.className}) OPTIONAL MATCH (n)${RelationshipSide.ToMe}` +
            `[r:${relationShipName}]${RelationshipSide.Neutral}(m:${User.entityName}) RETURN n, m`,
        );

        const objects = {};
        for (const record of result) {
            const obj = this.createObjectFromData(record.get('n'));
            const user = this.createObjectFromData(record.get('m'), User);
            if (objects[obj['id']] === undefined) {
                objects[obj['id']] = obj;
                objects[obj['id']][property] = [];
            }
            if (user !== null) {
                objects[obj['id']][property].push(user);
            }
        }

        return this.convertObjectToArray(objects);
    }

    public async findWithOperator(query: object, skip: number = 0, limit: number = null): Promise<object> {
        const queryString = this.convertQueryToQueryString(query);
        const records = await this.neo4jService.query(
            `MATCH (n:${this.className}) WHERE ${queryString} RETURN n SKIP ${skip} ${limit ? 'LIMIT ' + limit : ''}`,
        );

        return this.createObjectsFromRecord(records);
    }

    public async save(object: object): Promise<object> {
        const objectString = this.createStringFromObject(new this.classEntity(object));
        const result = await this.neo4jService.query(`CREATE (n:${this.className} ${objectString}) RETURN n`);

        return this.createObjectFromRecord(result);
    }

    public async update(object: object): Promise<object> {
        const instance = new this.classEntity(object);
        const setProps = this.convertPropsToString(object);
        const result = await this.neo4jService.query(`MERGE (n:${this.className} {id: ${instance.id}}) ON MATCH SET ${setProps} RETURN n`);

        return this.createObjectFromRecord(result);
    }

    public async createRelationship(id1: number, id2: number, entity2name: string): Promise<object> {
        const relationship = this.classEntity.associate(`${entity2name}${RelationshipSide.FromMe}`);
        const { relationShipName } = relationship;
        const result = await this.neo4jService.query(
            `MATCH (n:${this.className}),(m:${entity2name}) ` +
             `WHERE id(n) = ${id1} AND id(m) = ${id2} MERGE (n)-[r:${relationShipName}]->(m) RETURN m LIMIT 1`,
        );

        return this.createObjectFromRecord(result, relationship.className);
    }

    public async createRelationshipWithQuery(id1: number, query2: object, entity2name: string): Promise<object> {
        const relationship = this.classEntity.associate(`${entity2name}${RelationshipSide.FromMe}`);
        const { relationShipName } = relationship;
        const queryString = this.createStringFromObject(query2);
        const result = await this.neo4jService.query(
            `MATCH (n:${this.className}),(m:${entity2name} ${queryString})` +
            `WHERE id(n) = ${id1} MERGE (n)-[r:${relationShipName}]->(m) RETURN m`,
        );

        return this.createObjectsFromRecord(result, relationship.className);
    }

    public async deleteRelationship(id1: number, id2: number, entity2name: string): Promise<object> {
        const relationship = this.classEntity.associate(`${entity2name}${RelationshipSide.FromMe}`);
        const { relationShipName } = relationship;
        const result = await this.neo4jService.query(
            `MATCH (n:${this.className})-` +
            `[r:${relationShipName}]->(m:${entity2name})` +
            `WHERE id(n) = ${id1} AND id(m) = ${id2} DELETE r RETURN m`,
        );

        return this.createObjectFromRecord(result, relationship.className);
    }

    public async deleteRelationshipWithQuery(id1: number, query2: object, entity2name: string): Promise<object> {
        const queryString = this.convertQueryToQueryString(query2);
        const relationship = this.classEntity.associate(`${entity2name}${RelationshipSide.FromMe}`);
        const { relationShipName } = relationship;
        const result = await this.neo4jService.query(
            `MATCH (m:${this.className})-` +
            `[r:${relationShipName}]->(n:${entity2name})` +
            `WHERE id(m) = ${id1} AND ${queryString} DELETE r RETURN n`,
        );

        return this.createObjectsFromRecord(result, relationship.className);
    }

    public async checkForRelationShip(id1: number, id2: number, entity2name: string): Promise<boolean> {
        const { relationShipName } = this.classEntity.associate(`${entity2name}${RelationshipSide.FromMe}`);
        const result = await this.neo4jService.query(
            `MATCH (n:${this.className})-` +
            `[r:${relationShipName}]->(m:${entity2name})` +
            `WHERE id(n) = ${id1} AND id(m) = ${id2} RETURN r`,
        );

        return result.length !== 0;
    }

    public async getRelationship(id1: number, entity2name: string, side: RelationshipSide): Promise<object> {
        const instance = await this.findById(id1);
        if (instance === null) {
            return null;
        }

        const relationship = this.classEntity.associate(`${entity2name}${RelationshipSide.FromMe}`);
        const { relationShipName, property } = relationship;

        const result = await this.neo4jService.query(
            `MATCH (n:${this.className})${side === RelationshipSide.ToMe ? RelationshipSide.ToMe : RelationshipSide.Neutral}` +
            `[r:${relationShipName}]${side === RelationshipSide.FromMe ? RelationshipSide.FromMe : RelationshipSide.Neutral}(m:${entity2name})` +
            `WHERE id(n) = ${id1} RETURN m`,
        );

        instance[property] = this.createObjectsFromRecord(result, relationship.className);

        return instance;
    }

    public async getRelationshipWithQuery(id1: number, entity2name: string, side: RelationshipSide, query2: object): Promise<object> {
        const instance = await this.findById(id1);
        if (instance === null) {
            return null;
        }

        const queryString = this.convertQueryToQueryString(query2);

        const relationship = this.classEntity.associate(`${entity2name}${RelationshipSide.FromMe}`);
        const { relationShipName, property } = relationship;

        const result = await this.neo4jService.query(
            `MATCH (m:${this.className})${side === RelationshipSide.ToMe ? RelationshipSide.ToMe : RelationshipSide.Neutral}` +
            `[r:${relationShipName}]${side === RelationshipSide.FromMe ? RelationshipSide.FromMe : RelationshipSide.Neutral}(n:${entity2name})` +
            `WHERE id(m) = ${id1} AND ${queryString} RETURN n`,
        );

        instance[property] = this.createObjectsFromRecord(result, relationship.className);

        return instance;
    }

    protected convertPropsToString(object) {
        const instance = new this.classEntity(object);
        let string = '';
        instance.keys().forEach(key => {
            string += `n.${key} = ${instance[key]}`;
        });

        return string;
    }

    protected convertQueryToQueryString(object) {
        let string = '';
        Object.keys(object).forEach(key => {
            string += `n.${key} ${object[key]} `;
        });

        return string;
    }

    protected createObjectFromRecord(records, className = null) {
        const record = records[0];

        return this.createObject(record, className);
    }

    protected createObjectsFromRecord(records, className = null) {
        const objects = [];
        records.forEach(record => {
            const object = this.createObject(record, className);
            if (object !== null) {
                objects.push(object);
            }
        });

        if (objects.length === 0) {
            return null;
        }
        return objects;
    }

    protected createObject(record, className = null) {
        if (record === undefined) {
            return null;
        }

        let classConstructor = this.classEntity;
        if (className) {
            classConstructor = className;
        }

        const id = parseInt(record.get(0).identity, 10);
        const props = record.get(0).properties;
        return new classConstructor({ ...props, id });
    }

    protected createObjectFromData(data, className = null): object {
        if (data === undefined || data === null) {
            return null;
        }

        let classConstructor = this.classEntity;
        if (className) {
            classConstructor = className;
        }

        const id = parseInt(data.identity, 10);
        const props = data.properties;
        return new classConstructor({ id, ...props });
    }

    protected convertObjectToArray(obj: object): any[] {
        return Object.keys(obj).map((key) => (Array.isArray(obj[key]) && obj[key].length === 0) ? null : obj[key]);
    }

    protected createStringFromObject(query: object): string {
        if (query === undefined || query === null) {
            return '';
        }
        return stringifyObject(query);
    }
}
