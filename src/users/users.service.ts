import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

import { User } from './user.entity';
import { UsersArgs } from './dto/users.args';
import { OffsetPaginatedUser } from './dto/users.response';
import { OffsetPaginate } from '../common/paginate/offset/paginate.util';
import { CreateUserInput } from './dto/create-user.input';
import { sendMail } from '../common/nodemailer/send-mail.util';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly httpService: HttpService,
    ) {}

    async findAll(usersArgs: UsersArgs): Promise<OffsetPaginatedUser> {
        const { offset, limit, nickname } = usersArgs;

        const where: any = {};

        if (nickname) {
            where.nickname = Like(`%${nickname}%`);
        }

        const paginate = new OffsetPaginate<User>({ offset, limit });

        const [users, usersCount] = await this.usersRepository.findAndCount({
            where,
            relations: {
                followers: true,
            },
            skip: offset,
            take: limit,
            order: {
                nickname: 'ASC',
            },
        });

        return paginate.response(users, usersCount);
    }

    async findOne(id: number): Promise<User> {
        return this.usersRepository.findOne({
            where: { id },
            relations: {
                followers: true,
                platform: true,
            },
        });
    }

    async findOneById(id: number): Promise<User> {
        return this.usersRepository.findOneBy({ id });
    }

    async findOneByNickname(
        nickname: string,
        platformId: number = 1,
    ): Promise<User> {
        return this.usersRepository.findOneBy({ nickname, platformId });
    }

    async findOneByEmail(email: string, platformId: number = 1): Promise<User> {
        return this.usersRepository.findOneBy({ email, platformId });
    }

    async verifyGithub(code: string): Promise<AxiosResponse<any>> {
        const res = this.httpService.post(
            'https://github.com/login/oauth/access_token',
            {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
        );

        return firstValueFrom(res);
    }

    async getGithubProfile(accessToken: string): Promise<AxiosResponse<any>> {
        const res = this.httpService.get('https://api.github.com/user', {
            headers: {
                authorization: `token ${accessToken}`,
            },
        });

        return firstValueFrom(res);
    }

    async sendMail(email: string, captcha: string): Promise<any> {
        return sendMail(email, captcha);
    }

    async create(data: CreateUserInput, platformId: number = 1): Promise<User> {
        const user = this.usersRepository.create({ ...data, platformId });

        return this.usersRepository.save(user);
    }

    async update(me: User): Promise<User> {
        return this.usersRepository.save(me);
    }
}
