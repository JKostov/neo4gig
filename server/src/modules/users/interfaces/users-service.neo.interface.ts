import { User } from '../entity/user.neo.entity';
import { CreateUserNeoDto } from '../dto/createUser.neo.dto';
import { Genre } from '../../genres/entity/genre.neo.entity';
import { Event } from '../../events/entity/event.neo.entity';
import { Band } from '../../bands/entity/band.neo.entity';

export interface IUsersNeoService {
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User>;
    findOne(query: object): Promise<User>;
    find(query: object): Promise<User[]>;
    create(createUserDto: CreateUserNeoDto): Promise<User>;
    update(id: string, newValue: CreateUserNeoDto): Promise<User | null>;
    findWithOperator(query: object): Promise<User[]>;
    followUser(currentUser: User, userToFollow: User): Promise<User>;
    followGenreById(currentUser: User, genreToFollow: Genre): Promise<Genre>;
    followGenreByName(currentUser: User, genreToFollow: Genre): Promise<Genre>;
    attendEvent(currentUser: User, eventToAttend: Event): Promise<Event>;
    unfollowUser(currentUser: User, userToUnfollow: User): Promise<User>;
    unfollowGenreById(currentUser: User, genreToUnfollow: Genre): Promise<Genre>;
    unattendEvent(currentUser: User, eventToUnattend: Event): Promise<Event>;
    findUserWithFollowing(user: User): Promise<User>;
    findUserWithFollowers(user: User): Promise<User>;
    findUserWithFollowingGenres(user: User): Promise<User>;
    findUserWithAttendingFutureEvents(user: User): Promise<User>;
    findUserWithFollowersAndFollowing(id: number): Promise<User>;
    findUserWithFollowersFollowingAndGenres(query: object): Promise<User>;
    checkForFollowRelationship(id1: number, id2: number): Promise<boolean>;
    checkForAttendanceRelationship(id1: number, id2: number): Promise<boolean>;
    checkForInterestsRelationship(id1: number, id2: number): Promise<boolean>;
    findUserWithLikedBands(user: User): Promise<User>;
    findUserWithHisBand(user: User): Promise<User>;
    likeBand(currentUser: User, bandToLike: Band): Promise<Band>;
}
