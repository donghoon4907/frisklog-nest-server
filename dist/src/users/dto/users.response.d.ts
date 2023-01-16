import { User } from '../user.entity';
declare const OffsetPaginatedUser_base: import("@nestjs/common").Type<import("../../common/paging/offset/offset.interface").IOffsetPaginatedType<User>>;
export declare class OffsetPaginatedUser extends OffsetPaginatedUser_base {
}
declare const CursorPaginatedUser_base: import("@nestjs/common").Type<import("../../common/paging/cursor/cursor.interface").ICursorPaginatedType<User>>;
export declare class CursorPaginatedUser extends CursorPaginatedUser_base {
}
export {};
