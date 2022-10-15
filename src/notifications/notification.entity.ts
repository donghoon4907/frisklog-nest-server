import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { IsDateString, IsOptional } from 'class-validator';
import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    Column,
    DeleteDateColumn,
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
    from: Promise<User>;

    @ManyToOne(() => User, (user) => user.receiveNotifications)
    @Field(() => User, { description: '수신자' })
    to: Promise<User>;

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

    @DeleteDateColumn()
    @HideField()
    deletedAt?: Date;
}
