
import {Injectable, HttpException, HttpStatus, Inject} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserPgDto } from './dto/createUser.pg.dto';
import { User } from './entity/user.entity';
import { User as NeoUser } from './entity/user.neo.entity';
import { IUsersService } from './interfaces/users-service.interface';
import {UsersNeoRepository} from './repository/users-repository.neo';
import {CreateUserNeoDto} from './dto/createUser.neo.dto';
import {CreateUserDto} from './dto/createUser.dto';

@Injectable()
export class UsersService implements IUsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @Inject('UsersNeoRepository')
        private readonly usersNeoRepository: UsersNeoRepository,
    ) {}

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async findById(id: string): Promise<User> {
        return await this.usersRepository.findOne(id);
    }

    async findOne(query: object): Promise<User> {
        return await this.usersRepository.findOne(query);
    }

    async create(createUserDto: CreateUserDto): Promise<User> {

        const { createNeoUserDto, createUserPgDto } = UsersService.getPgAndNeoUserDtos(createUserDto);

        await this.usersNeoRepository.save(new NeoUser(createNeoUserDto));
        return await this.usersRepository.save(new User(createUserPgDto));
    }

    async update(id: string, newValue: CreateUserPgDto): Promise<User | null> {

        let user = await this.usersRepository.findOne(id);

        if (!user.id) {
            throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
        }

        user = this._assign(user, newValue);

        return await this.usersRepository.save(user);
    }

    public async delete(id: string): Promise<DeleteResult> {

        return await this.usersRepository.delete(id);
    }

    private _assign(user: User, newValue: CreateUserPgDto) {
        // tslint:disable-next-line:no-string-literal
        for (const key of Object.keys(newValue)) {
            if (user[key] !== newValue[key]) {
                //
                user[key] = newValue[key];
            }
        }
        return user;
    }

    private static getPgAndNeoUserDtos(createUserDto: CreateUserDto) {
        const { name, instrument, isMusician, city, ...pgUser} = createUserDto;
        const createNeoUserDto: CreateUserNeoDto = {
            name,
            instrument,
            isMusician,
            city,
        };

        const createUserPgDto: CreateUserPgDto = {name, ...pgUser};

        return {
            createNeoUserDto,
            createUserPgDto,
        };
    }
}
