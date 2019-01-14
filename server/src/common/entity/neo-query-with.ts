import { RelationshipSide } from '../enum/neo-relationship-side.enum';

export class QueryWith {
    public readonly className: string;
    public readonly side: RelationshipSide;

    constructor(className: string, side: RelationshipSide) {
        this.className = className;
        this.side = side;
    }
}
