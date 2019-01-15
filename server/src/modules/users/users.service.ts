
import {Injectable, HttpException, HttpStatus, Inject} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserPgDto } from './dto/createUser.pg.dto';
import { User } from './entity/user.entity';
import { User as NeoUser } from './entity/user.neo.entity';
import { IUsersService } from './interfaces/users-service.interface';
import { CreateUserNeoDto } from './dto/createUser.neo.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { Event } from '../events/entity/event.neo.entity';
import { EventsNeoService } from '../events/events.neo.service';
import { IEventsNeoService } from '../events/interfaces/events-service.neo.interface';
import { IUsersNeoService } from './interfaces/users-service.neo.interface';
import { IGenresNeoService } from '../genres/interfaces/genres-service.neo.interface';
import { Genre } from '../genres/entity/genre.neo.entity';
import { CreateEventNeoDto } from '../events/dto/createEvent.neo.dto';
import {Band} from '../bands/entity/band.neo.entity';
import {IBandsNeoService} from '../bands/interfaces/bands-service.neo.interface';

@Injectable()
export class UsersService implements IUsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @Inject('UsersNeoService')
        private readonly usersNeoService: IUsersNeoService,
        @Inject('EventsNeoService')
        private readonly eventsNeoService: IEventsNeoService,
        @Inject('GenresNeoService')
        private readonly genresNeoService: IGenresNeoService,
        @Inject('BandsNeoService')
        private readonly bandsNeoService: IBandsNeoService,
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
        const { email } = user;
        const neoUser: NeoUser = await this.usersNeoService.findUserWithFollowersFollowingAndGenres({ email });
        const userCityEvents: Event[] = await this.eventsNeoService.find({ city: neoUser.city });

        return {
            ...neoUser,
            ...user,
            neoId: neoUser.id,
            userCityEvents,
        };
    }

    async updateFollow(ids: any): Promise<NeoUser | HttpException> {
        if (!ids.id1 || !ids.id2) {
            return new HttpException('Bad request.', HttpStatus.BAD_REQUEST);
        }
        const { id1, id2 } = ids;

        const user1 = await this.usersNeoService.findById(id1.toString());
        const user2 = await this.usersNeoService.findById(id2.toString());

        return await this.usersNeoService.checkForFollowRelationship(id1, id2)
            ? await this.usersNeoService.unfollowUser(user1, user2)
            : await this.usersNeoService.followUser(user1, user2);
    }

    async updateInterest(ids: any): Promise<Genre | HttpException> {
        if (!ids.id1 || !ids.id2) {
            return new HttpException('Bad request.', HttpStatus.BAD_REQUEST);
        }

        const { id1, id2 } = ids;

        const user1 = await this.usersNeoService.findById(id1.toString());
        const genre = await this.genresNeoService.findById(id2.toString());

        return await this.usersNeoService.checkForInterestsRelationship(id1, id2)
            ? await this.usersNeoService.unfollowGenreById(user1, genre)
            : await this.usersNeoService.followGenreById(user1, genre);
    }

    async updateAttendance(ids: any): Promise<Event | HttpException> {
        if (!ids.id1 || !ids.id2) {
            return new HttpException('Bad request.', HttpStatus.BAD_REQUEST);
        }

        const { id1, id2 } = ids;

        const user1 = await this.usersNeoService.findById(id1.toString());
        const event = await this.eventsNeoService.findById(id2.toString());

        return await this.usersNeoService.checkForAttendanceRelationship(id1, id2)
            ? await this.usersNeoService.unattendEvent(user1, event)
            : await this.usersNeoService.attendEvent(user1, event);
    }

    async updateLikes(ids: any): Promise<Band | HttpException> {
        if (!ids.id1 || !ids.id2) {
            return new HttpException('Bad request.', HttpStatus.BAD_REQUEST);
        }

        const { id1, id2 } = ids;

        const user = await this.usersNeoService.findById(id1.toString());
        const band = await this.bandsNeoService.findById(id2.toString());

        return await this.usersNeoService.checkForLikesRelationship(id1, id2)
            ? await this.usersNeoService.unlikeBand(user, band)
            : await this.usersNeoService.likeBand(user, band);
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

    async createEvent(neoId: string, createEventNeoDto: CreateEventNeoDto): Promise<Event> {
        const user = await this.usersNeoService.findById(neoId);
        const event = await this.eventsNeoService.create(createEventNeoDto);
        return await this.usersNeoService.attendEvent(user, event);
    }

    async getSuggestedUsersByGenre(genreId: number, userId: number, limit: number = 5): Promise<NeoUser[]> {
        return await this.usersNeoService.getSuggestedUsersByGenre(genreId, userId, limit);
    }

    async getSuggestedUsersByBand(bandId: number, userId: number, limit: number = 5): Promise<NeoUser[]> {
        return await this.usersNeoService.getSuggestedUsersByBand(bandId, userId, limit);
    }
}
