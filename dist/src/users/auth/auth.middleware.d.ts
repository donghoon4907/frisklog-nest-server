import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
export declare class AuthMiddleware implements CanActivate {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
