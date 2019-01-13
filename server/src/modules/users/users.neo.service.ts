
import {Injectable, HttpException, HttpStatus, Inject} from '@nestjs/common';
import { CreateUserNeoDto } from './dto/createUser.neo.dto';
import { User } from './entity/user.neo.entity';
import { IUsersNeoService } from './interfaces/users-service.neo.interface';
import { Genre } from '../genres/entity/genre.neo.entity';
import { Event } from '../events/entity/event.neo.entity';
import { RelationshipSide } from '../../common/enum/neo-relationship-side.enum';
import * as moment from 'moment';

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
        console.log(await this.usersNeoRepository.findOne(query), 'tu li je ');
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

    async findWithOperator(query: object): Promise<User[]> {
        return await this.usersNeoRepository.findWithOperator(query);
    }

    async followUser(currentUser: User, userToFollow: User): Promise<User> {
        const currentUserId = currentUser.id;
        const userToFollowId = userToFollow.id;

        return await this.usersNeoRepository.createRelationship(currentUserId, userToFollowId, User.entityName);
    }

    async followGenreById(currentUser: User, genreToFollow: Genre): Promise<User> {
        const currentUserId = currentUser.id;
        const genreToFollowId = genreToFollow.id;

        return await this.usersNeoRepository.createRelationship(currentUserId, genreToFollowId, Genre.entityName);
    }

    async followGenreByName(currentUser: User, genreToFollow: Genre): Promise<User> {
        const currentUserId = currentUser.id;
        const { name } = genreToFollow;

        return await this.usersNeoRepository.createRelationshipWithQuery(currentUserId, { name }, Genre.entityName);
    }

    async attendEvent(currentUser: User, eventToAttend: Event): Promise<User> {
        const currentUserId = currentUser.id;
        const eventToAttendId = eventToAttend.id;

        return await this.usersNeoRepository.createRelationship(currentUserId, eventToAttendId, Event.entityName);
    }

    async unfollowUser(currentUser: User, userToUnfollow: User): Promise<User> {
        const currentUserId = currentUser.id;
        const userToUnfollowId = userToUnfollow.id;

        return await this.usersNeoRepository.deleteRelationship(currentUserId, userToUnfollowId, User.entityName);
    }

    async unfollowGenreById(currentUser: User, genreToUnfollow: Genre): Promise<User> {
        const currentUserId = currentUser.id;
        const genreToUnfollowId = genreToUnfollow.id;

        return await this.usersNeoRepository.deleteRelationship(currentUserId, genreToUnfollowId, Genre.entityName);
    }

    async unattendEvent(currentUser: User, eventToUnattend: Event): Promise<User> {
        const currentUserId = currentUser.id;
        const eventToUnattendId = eventToUnattend.id;

        return await this.usersNeoRepository.deleteRelationship(currentUserId, eventToUnattendId, Event.entityName);
    }

    async findUserWithFollowing(user: User): Promise<User> {
        const { id } = user;
        return await this.usersNeoRepository.getRelationship(id, User.entityName, RelationshipSide.FromMe);
    }

    async findUserWithFollowers(user: User): Promise<User> {
        const { id } = user;
        return await this.usersNeoRepository.getRelationship(id, User.entityName, RelationshipSide.ToMe);
    }

    async findUserWithFollowingGenres(user: User): Promise<User> {
        const { id } = user;
        return await this.usersNeoRepository.getRelationship(id, Genre.entityName, RelationshipSide.FromMe);
    }

    async findUserWithAttendingFutureEvents(user: User): Promise<User> {
        const { id } = user;
        return await this.usersNeoRepository.getRelationshipWithQuery(
            id,
            Genre.entityName, RelationshipSide.ToMe,
            { dateAndTime: `> ${moment().format()}` },
        );
    }
}
