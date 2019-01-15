import { User } from '../entity/user.entity';
import { User as NeoUser } from '../entity/user.neo.entity';
import { CreateUserPgDto } from '../dto/createUser.pg.dto';
import { DeleteResult } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { Event } from '../../events/entity/event.neo.entity';
import { Genre } from '../../genres/entity/genre.neo.entity';
import { CreateEventNeoDto } from '../../events/dto/createEvent.neo.dto';
import {Band} from '../../bands/entity/band.neo.entity';

export interface IUsersService {
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User>;
    findOne(query: object): Promise<User>;
    getUserFeed(id: string): Promise<User>;
    create(createUserDto: CreateUserPgDto): Promise<User>;
    update(id: string, newValue: CreateUserPgDto): Promise<User | null>;
    delete(id: string): Promise<DeleteResult>;
    updateFollow(ids: any): Promise<NeoUser | HttpException>;
    updateInterest(ids: any): Promise<Genre | HttpException>;
    updateAttendance(ids: any): Promise<Event | HttpException>;
    updateLikes(ids: any): Promise<Band | HttpException>;
    createEvent(neoId: string, createEventNeoDto: CreateEventNeoDto): Promise<Event>;
    getSuggestedUsersByGenre(genreId: number, userId: number, limit: number): Promise<NeoUser[]>;
    getSuggestedUsersByBand(bandId: number, userId: number, limit: number): Promise<NeoUser[]>;
}
