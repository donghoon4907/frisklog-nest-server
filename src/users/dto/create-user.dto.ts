import {
    Field,
    InputType,
    IntersectionType,
    PartialType,
    PickType,
} from '@nestjs/graphql';
import { IsEmail, IsNumber, IsOptional } from 'class-validator';

import { User } from '../user.entity';

@InputType()
class CreateUserRequiredInput extends PickType(
    User,
    ['nickname'] as const,
    InputType,
) {}

@InputType()
class CreateUserOptionalInput extends PartialType(
    PickType(User, ['avatar'] as const, InputType),
) {
    @Field({ nullable: true })
    @IsOptional()
    @IsEmail()
    email?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsNumber()
    githubId?: number;
}

@InputType()
export class CreateUserDto extends IntersectionType(
    CreateUserRequiredInput,
    CreateUserOptionalInput,
) {}
