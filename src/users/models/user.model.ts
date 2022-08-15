import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
    @Field((type) => ID)
    id: string;

    @Field({ description: '이메일' })
    email: string;

    @Field({ description: '제목' })
    nickname: string;

    @Field({ description: '프로필사진', nullable: true })
    avatar?: string;

    @Field({ description: '관리자여부' })
    isMaster: boolean;

    @Field({ description: '보안문자', nullable: true })
    token?: string;

    @Field({ description: '상태코드' })
    status: string;

    @Field({ description: '상태설명' })
    statusText: string;

    @Field({ description: '링크' })
    link: string;

    @Field({ description: '생성일' })
    createdAt: Date;

    @Field({ description: '수정일' })
    updatedAt: Date;
}
