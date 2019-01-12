
import {Injectable, HttpException, HttpStatus, Inject} from '@nestjs/common';
import { CreateUserNeoDto } from './dto/createUser.neo.dto';
import { User } from './entity/user.neo.entity';
import { IUsersNeoService } from './interfaces/users-service.neo.interface';

@Injectable()
export class UsersNeoService implements IUsersNeoService {
    constructor(
        @Inject('UsersNeoRepository') private readonly usersNeoRepository,
    ) {}

    async findAll(): Promise<User[]> {
        return await this.usersNeoRepository.find();
    }

    async findById(id: string): Promise<User> {
        return await this.usersNeoRepository.findById(id);
    }

    async findOne(query: object): Promise<User> {
        return await this.usersNeoRepository.findOne(query);
    }

    async find(query: object): Promise<User[]> {
        return await this.usersNeoRepository.find(query);
    }

    async create(createUserNeoDto: CreateUserNeoDto): Promise<User> {
        return await this.usersNeoRepository.save(createUserNeoDto);
    }

    async update(id: string, newValue: CreateUserNeoDto): Promise<User | null> {

        return await this.usersNeoRepository.update({ ...newValue, id });
    }
}
