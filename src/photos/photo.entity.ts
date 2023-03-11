import { Field, ObjectType } from '@nestjs/graphql';
import { IsEnum, IsString } from 'class-validator';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import { PhotoType } from './photo.interface';
import { User } from '../users/user.entity';

@Entity('photos')
@ObjectType()
export class Photo {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column({ comment: '업로드주소' })
    @Field({ description: '업로드주소' })
    @IsString()
    src: string;

    @Column({
        comment: '사진타입',
        type: 'enum',
        enum: PhotoType,
    })
    @Field(() => String, { description: '사진타입' })
    @IsString()
    @IsEnum(PhotoType)
    type: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    @Field(() => User, { description: '사용자' })
    user: Promise<User>;
}
