import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsArray, IsString } from 'class-validator';
import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../users/user.entity';

@Entity('platforms')
@ObjectType()
export class Platform extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field((type) => ID)
    id: number;

    @Column({ unique: true })
    @Field({ description: '플랫폼명' })
    @IsString()
    platformName: string;

    @Column()
    @Field({ description: '로고경로' })
    @IsString()
    logoUrl: string;

    @Column()
    @Field({ description: '도메인' })
    @IsString()
    domainUrl: string;

    @OneToMany(() => User, (user) => user.platform)
    @Field(() => [User], { description: '사용자목록' })
    @IsArray()
    users: User[];
}
