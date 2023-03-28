import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { NaverService } from './naver.service';

@Module({
    imports: [HttpModule],
    providers: [NaverService],
    exports: [NaverService],
})
export class NaverModule {}
