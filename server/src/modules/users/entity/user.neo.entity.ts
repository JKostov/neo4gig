import { CreateUserNeoDto } from '../dto/createUser.neo.dto';

export class User {

    constructor();
    constructor(user: CreateUserNeoDto);
    constructor(user?: any)
    {
        this.id = user && user.id || null;
        this.name = user && user.name || null;
        this.email = user && user.email || null;
        this.city = user && user.city || null;
        this.instrument = user && user.instrument || null;
        this.isMusician = user && user.isMusician || null;
    }

    id: string;

    name: string;

    email: string;

    city: string;

    instrument: string;

    isMusician: string;
}
