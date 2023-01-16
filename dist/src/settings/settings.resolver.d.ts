import { Setting } from './setting.entity';
import { SettingsService } from './settings.service';
import { UpdateSettingDto } from './dto/update-setting.dto';
export declare class SettingsResolver {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    updateSetting(updateSettingDto: UpdateSettingDto): Promise<Setting>;
}
