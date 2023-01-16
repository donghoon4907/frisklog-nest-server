import { Setting } from '../setting.entity';
declare const UpdateSettingInput_base: import("@nestjs/common").Type<Pick<Setting, "followerPostNoti">>;
export declare class UpdateSettingInput extends UpdateSettingInput_base {
}
export declare class UpdateSettingDto {
    id: string;
    data: UpdateSettingInput;
}
export {};
