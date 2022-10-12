import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { IsDateString, IsOptional } from 'class-validator';
import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    Column,
} from 'typeorm';

import { User } from '../users/user.entity';

@Entity('notifications')
@ObjectType()
export class Notification {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @ManyToOne(() => User, (user) => user.sendNotifications)
    @Field(() => User, { description: '발신자' })
    user: Promise<User>;

    // @Column()
    // @HideField()
    // userId: string;

    @ManyToOne(() => User, (user) => user.receiveNotifications)
    @Field(() => User, { description: '수신자' })
    target: Promise<User>;

    // @Column()
    // @HideField()
    // targetId: string;

    @Column()
    @Field({ description: '내용' })
    content: string;

    @Column()
    @Field({ description: '링크' })
    url: string;

    @CreateDateColumn()
    @Field()
    @IsDateString()
    createdAt: Date;

    @Column({ nullable: true })
    @Field()
    @IsOptional()
    @IsDateString()
    readedAt?: Date;
}
