import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { UpdateSettingInput } from './dto/update-setting.dto';
import { Setting } from './setting.entity';
export declare class SettingsService {
    private readonly settingsRepository;
    constructor(settingsRepository: Repository<Setting>);
    findById(id: string): Promise<Setting>;
    createSetting(user: User): Promise<Setting>;
    updateSetting(updateSettingInput: UpdateSettingInput, setting: Setting): Promise<Setting>;
}
