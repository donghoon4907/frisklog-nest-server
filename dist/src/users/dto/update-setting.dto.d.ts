import { User } from '../user.entity';
declare const UpdateSettingDto_base: import("@nestjs/common").Type<Partial<Pick<User, "receivePostNotification" | "receiveLikeNotification">>>;
export declare class UpdateSettingDto extends UpdateSettingDto_base {
}
export {};
