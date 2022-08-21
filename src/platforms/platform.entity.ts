import { Field, ID, ObjectType } from '@nestjs/graphql';
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
    platformName: string;

    @Column()
    @Field({ description: '로고경로' })
    logoUrl: string;

    @Column()
    @Field({ description: '도메인' })
    domainUrl: string;

    @OneToMany(() => User, (user) => user.platform)
    users: User[];
}
