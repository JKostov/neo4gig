import { User } from '../entity/user.neo.entity';
import { CreateUserNeoDto } from '../dto/createUser.neo.dto';

export interface IUsersNeoService {
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User>;
    findOne(query: object): Promise<User>;
    find(query: object): Promise<User[]>;
    create(createUserDto: CreateUserNeoDto): Promise<User>;
    update(id: string, newValue: CreateUserNeoDto): Promise<User | null>;
}
