import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { IsDateString } from 'class-validator';
import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    Column,
} from 'typeorm';

import { User } from '../users/user.entity';

@Entity('attendance')
@ObjectType()
export class Attendance {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    @Field(() => User, { description: '사용자' })
    user: Promise<User>;

    @Column({ name: 'userId' })
    @HideField()
    userId: string;

    @CreateDateColumn()
    @Field()
    @IsDateString()
    createdAt: Date;
}
