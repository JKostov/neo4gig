import { Band } from '../entity/band.neo.entity';
import { CreateBandNeoDto } from '../dto/createBand.neo.dto';
import { User } from '../../users/entity/user.neo.entity';

export interface IBandsNeoService {
    findAll(): Promise<Band[]>;
    findById(id: string): Promise<Band>;
    findOne(query: object): Promise<Band>;
    find(query: object): Promise<Band[]>;
    create(createBandNeoDto: CreateBandNeoDto): Promise<Band>;
    update(id: string, newValue: CreateBandNeoDto): Promise<Band | null>;
    addMember(band: Band, userToAdd: User): Promise<User>;
}
