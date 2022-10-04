import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { User } from './user.entity';

@Entity('follow')
@ObjectType()
export class Follow {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @ManyToOne(() => User, (user) => user.followers)
    @Field(() => User)
    acceptor: Promise<User>;

    @ManyToOne(() => User, (user) => user.followings)
    @Field(() => User)
    requester: Promise<User>;
}
