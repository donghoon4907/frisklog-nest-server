import { User } from '../user.entity';
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<Pick<User, "nickname" | "avatar" | "status">>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export {};
