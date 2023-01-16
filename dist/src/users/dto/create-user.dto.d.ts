import { User } from '../user.entity';
declare const CreateUserRequiredInput_base: import("@nestjs/common").Type<Pick<User, "nickname">>;
declare class CreateUserRequiredInput extends CreateUserRequiredInput_base {
}
declare const CreateUserOptionalInput_base: import("@nestjs/common").Type<Partial<Pick<User, "avatar">>>;
declare class CreateUserOptionalInput extends CreateUserOptionalInput_base {
    email?: string;
    githubId?: number;
}
declare const CreateUserDto_base: import("@nestjs/common").Type<CreateUserRequiredInput & CreateUserOptionalInput>;
export declare class CreateUserDto extends CreateUserDto_base {
}
export {};
