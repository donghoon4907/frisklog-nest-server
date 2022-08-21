import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(
    PickType(CreateUserInput, ['nickname', 'avatar'] as const),
) {
    @Field({ nullable: true })
    @IsOptional()
    status?: string;

    @Field({ nullable: true })
    @IsOptional()
    isKeep?: boolean;
}
