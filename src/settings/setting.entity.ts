import { Field, ObjectType } from '@nestjs/graphql';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
} from 'typeorm';

import { User } from '../users/user.entity';

@Entity('settings')
@ObjectType()
export class Setting {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    // @OneToOne(() => User, (user) => user.setting)
    // @JoinColumn({ name: 'userId' })
    // @Field(() => User)
    // user: Promise<User>;

    @Column({ default: false })
    @Field()
    followerPostNoti: boolean;
}
