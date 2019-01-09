import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { IsEmail, IsUUID } from 'class-validator';
import { PasswordRecovery } from '../../auth/entity/password-recovery.entity';
import { Status } from '../enum/status.enum';
import { CreateUserDto } from '../dto/createUser.dto';

@Entity({
  name: 'users',
})
export class User {

    constructor();
    constructor(user: CreateUserDto);
    constructor(user?: any)
    {
        this.id = user && user.id || undefined;
        this.name = user && user.name || undefined;
        this.email = user && user.email || undefined;
        this.password = user && user.password || undefined;
        this.registerToken = user && user.registerToken || undefined;
        this.status = user && user.status === Status.Active ? Status.Active : Status.Inactive || undefined;
    }

    @IsUUID('4')
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @IsEmail()
    @Column({
        unique: true,
    })
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'varchar',
        default: Status.Inactive,
    })
    status: Status;

    @IsUUID('4')
    @Column({
        nullable: true,
    })
    registerToken: string;

    @OneToMany(type => PasswordRecovery, passwordRecovery => passwordRecovery.user)
    passwordRecoveries: PasswordRecovery[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
