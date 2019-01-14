
import {Injectable, HttpException, HttpStatus, Inject} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserPgDto } from './dto/createUser.pg.dto';
import { User } from './entity/user.entity';
import { User as NeoUser } from './entity/user.neo.entity';
import { IUsersService } from './interfaces/users-service.interface';
import {CreateUserNeoDto} from './dto/createUser.neo.dto';
import {CreateUserDto} from './dto/createUser.dto';
import {UsersNeoService} from './users.neo.service';
import {Event} from '../events/entity/event.neo.entity';
import {EventsNeoService} from '../events/events.neo.service';
import {IEventsNeoService} from '../events/interfaces/events-service.neo.interface';

@Injectable()
export class UsersService implements IUsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @Inject('UsersNeoService')
        private readonly usersNeoService: UsersNeoService,
        @Inject('EventsNeoService')
        private readonly eventsNeoService: IEventsNeoService,
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

    async getUserFeed(id: string): Promise<any> {
        const user: User = await this.findById(id);
        const neoUser: NeoUser = await this.usersNeoService.findOne({ name: user.name });
        const { genres } = await this.usersNeoService.findUserWithFollowingGenres(neoUser);
        const { followers } = await this.usersNeoService.findUserWithFollowers(neoUser);
        const { following } = await this.usersNeoService.findUserWithFollowing(neoUser);
        const userCityEvents: Event[] = await this.eventsNeoService.find({ city: neoUser.city });

        neoUser.genres = genres;
        neoUser.following = following;
        neoUser.followers = followers;

        return {
            ...neoUser,
            ...user,
            userCityEvents,
        };
    }

    async create(createUserDto: CreateUserDto): Promise<User> {

        const { createNeoUserDto, createUserPgDto } = UsersService.getPgAndNeoUserDtos(createUserDto);

        await this.usersNeoService.create(createNeoUserDto);
        return await this.usersRepository.save(new User(createUserPgDto));
    }

    async update(id: string, newValue: CreateUserPgDto): Promise<User | null> {

        let user = await this.usersRepository.findOne(id);

        if (!user.id) {
            throw new HttpException('Profile does not exist', HttpStatus.BAD_REQUEST);
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
