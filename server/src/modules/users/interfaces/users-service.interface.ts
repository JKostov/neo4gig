import { User } from '../entity/user.entity';
import { CreateUserPgDto } from '../dto/createUser.pg.dto';
import { DeleteResult } from 'typeorm';

export interface IUsersService {
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User>;
    findOne(query: object): Promise<User>;
    getUserFeed(id: string): Promise<User>;
    create(createUserDto: CreateUserPgDto): Promise<User>;
    update(id: string, newValue: CreateUserPgDto): Promise<User | null>;
    delete(id: string): Promise<DeleteResult>;
}
