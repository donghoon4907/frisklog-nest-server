import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersArgs } from './dto/users.args';
import { OffsetPaginatedUser } from './dto/users.response';
import { CreateUserDto } from './dto/create-user.dto';
import { FollowingsArgs } from './dto/followings.args';
import { RecommendersArgs } from './dto/recommenders.args';
import { Follow } from './follow.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
export declare class UsersService {
    private readonly usersRepository;
    private readonly followsRepository;
    constructor(usersRepository: Repository<User>, followsRepository: Repository<Follow>);
    findAll(usersArgs: UsersArgs): Promise<OffsetPaginatedUser>;
    recommenders(recommendersArgs: RecommendersArgs): Promise<OffsetPaginatedUser>;
    followings(followingsArgs: FollowingsArgs, authId: string): Promise<OffsetPaginatedUser>;
    isFollowing(acceptorId: string, requesterId: string): Promise<boolean>;
    findById(id: string): Promise<User>;
    findByGithubId(githubId: number): Promise<User>;
    hasNickname(nickname: string): Promise<User>;
    hasEmail(email: string): Promise<User>;
    sendMail(email: string, captcha: string): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
    createUser(createUserDto: CreateUserDto, platformId?: number): Promise<User>;
    updateUser(updateUserDto: UpdateUserDto, user: User): Promise<User>;
    updateSetting(updateSettingDto: UpdateSettingDto, user: User): Promise<User>;
    login(captcha: string, user: User): Promise<User>;
    verify(isKeep: boolean, user: User): Promise<User>;
    follow(me: User, target: User): Promise<User>;
    unfollow(me: User, target: User): Promise<User>;
}