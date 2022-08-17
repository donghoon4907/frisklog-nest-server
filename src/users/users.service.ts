import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

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

    async findOneByNickname(
        nickname: string,
        platformId: number = 1,
    ): Promise<User> {
        return this.usersRepository.findOneBy({ nickname, platformId });
    }

    async findOneByEmail(email: string, platformId: number = 1): Promise<User> {
        return this.usersRepository.findOneBy({ email, platformId });
    }

    async sendMail(email: string, captcha: string): Promise<any> {
        return sendMail(email, captcha);
    }

    async create(data: CreateUserInput): Promise<User> {
        const user = this.usersRepository.create({ ...data, platformId: 1 });

        return this.usersRepository.save(user);
    }

    async update(me: User): Promise<User> {
        return this.usersRepository.save(me);
    }
}
