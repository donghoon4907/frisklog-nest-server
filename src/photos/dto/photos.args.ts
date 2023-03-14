import { ArgsType, Field } from '@nestjs/graphql';
import { IsEnum, IsOptional } from 'class-validator';

import { PhotoType } from '../photo.interface';
import { OffsetPaginatedArgs } from '../../common/paging/offset/offset.args';

@ArgsType()
export class PhotosArgs extends OffsetPaginatedArgs {
    @Field({ description: '사진타입', nullable: true })
    @IsOptional()
    @IsEnum(PhotoType)
    type?: string;
}
