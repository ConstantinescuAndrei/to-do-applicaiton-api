import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { UserSchema } from './user.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service'

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forFeature([
            { name: 'Users', schema: UserSchema }
        ])
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}