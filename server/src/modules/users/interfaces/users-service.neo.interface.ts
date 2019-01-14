import { User } from '../entity/user.neo.entity';
import { CreateUserNeoDto } from '../dto/createUser.neo.dto';
import { Genre } from '../../genres/entity/genre.neo.entity';
import { Event } from '../../events/entity/event.neo.entity';

export interface IUsersNeoService {
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User>;
    findOne(query: object): Promise<User>;
    find(query: object): Promise<User[]>;
    create(createUserDto: CreateUserNeoDto): Promise<User>;
    update(id: string, newValue: CreateUserNeoDto): Promise<User | null>;
    findWithOperator(query: object): Promise<User[]>;
    followUser(currentUser: User, userToFollow: User): Promise<User>;
    followGenreById(currentUser: User, genreToFollow: Genre): Promise<User>;
    followGenreByName(currentUser: User, genreToFollow: Genre): Promise<User>;
    attendEvent(currentUser: User, eventToAttend: Event): Promise<User>;
    unfollowUser(currentUser: User, userToUnfollow: User): Promise<User>;
    unfollowGenreById(currentUser: User, genreToUnfollow: Genre): Promise<User>;
    unattendEvent(currentUser: User, eventToUnattend: Event): Promise<User>;
    findUserWithFollowing(user: User): Promise<User>;
    findUserWithFollowers(user: User): Promise<User>;
    findUserWithFollowingGenres(user: User): Promise<User>;
    findUserWithAttendingFutureEvents(user: User): Promise<User>;
    findUserWithFollowersAndFollowing(id: number): Promise<User>;
    findUserWithFollowersFollowingAndGenres(query: object): Promise<User>;
}
