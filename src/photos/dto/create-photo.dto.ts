import { InputType, PickType } from '@nestjs/graphql';

import { Photo } from '../photo.entity';

@InputType()
export class CreatePhotoDto extends PickType(
    Photo,
    ['src', 'type'],
    InputType,
) {}
