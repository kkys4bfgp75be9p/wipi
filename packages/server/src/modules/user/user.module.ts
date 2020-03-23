import {Module, forwardRef} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from '../auth/auth.module';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {User} from './user.entity';
import {ConfigModule} from '../../config';

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
    providers: [UserService],
    exports: [UserService],
    controllers: [UserController],
})
export class UserModule {
}
