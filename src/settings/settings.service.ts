import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { UpdateSettingInput } from './dto/update-setting.dto';

import { Setting } from './setting.entity';

@Injectable()
export class SettingsService {
    constructor(
        @InjectRepository(Setting)
        private readonly settingsRepository: Repository<Setting>,
    ) {}

    findById(id: string) {
        return this.settingsRepository.findOne({ where: { id } });
    }

    async createSetting(user: User) {
        const setting = new Setting();

        // setting.user = Promise.resolve(user);

        await this.settingsRepository.save(setting);

        return setting;
    }

    async updateSetting(
        updateSettingInput: UpdateSettingInput,
        setting: Setting,
    ) {
        const { followerPostNoti } = updateSettingInput;

        setting.followerPostNoti = followerPostNoti;

        await this.settingsRepository.save(setting);

        return setting;
    }
}
