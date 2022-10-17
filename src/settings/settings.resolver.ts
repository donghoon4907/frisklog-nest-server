import { ForbiddenException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Setting } from './setting.entity';
import { SettingsService } from './settings.service';
import { AuthGuard } from '../users/auth/auth.guard';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Resolver((of) => Setting)
export class SettingsResolver {
    constructor(private readonly settingsService: SettingsService) {}

    @Mutation((returns) => Setting)
    @UseGuards(AuthGuard)
    async updateSetting(@Args('input') updateSettingDto: UpdateSettingDto) {
        const { id, data } = updateSettingDto;

        const setting = await this.settingsService.findById(id);

        if (setting === null) {
            throw new ForbiddenException('설정 정보를 찾을 수 없습니다');
        }

        return this.settingsService.updateSetting(data, setting);
    }
}
