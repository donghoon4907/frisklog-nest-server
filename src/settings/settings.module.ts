import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/user.entity';
import { Setting } from './setting.entity';
import { SettingsResolver } from './settings.resolver';
import { SettingsService } from './settings.service';

@Module({
    imports: [TypeOrmModule.forFeature([Setting, User])],
    providers: [SettingsResolver, SettingsService],
    exports: [SettingsService],
})
export class SettingsModule {}
