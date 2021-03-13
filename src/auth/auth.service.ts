import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { User } from './user.model';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('Users') private readonly userModel: Model<User>
    ) {}

    async login(username: string, password: string) : Promise<Object> {
        const user = await this.userModel.findOne({ username }).exec();
        console.log(user);
        console.log(username)
        console.log(password);
        if(user) {
            const passwordMatch = await bcrypt.compare(password, user['password']);
            console.log(passwordMatch);

            if(passwordMatch) {
                const result: Object = {
                    user,
                    validUser: true
                };
                return result;
            }
        }

        const result: Object = {
            validUser: false,
            reason: "Username or password invalid!"
        }

        return result;
    } 

    async register(
        firstName: string, 
        lastName: string, 
        username: string, 
        email: string, 
        password: string
    ) : Promise<Object> {
        const hashPassword = await bcrypt.hash(password, 10);
        const emailExist = await this.userModel.findOne({ email }).exec();
        const usernameExist = await this.userModel.findOne({ username }).exec();

        if(emailExist || usernameExist) {
            const result: Object = {
                registered: false,
                reason: "Username or email already used"
            }

            return result;
        }

        const newUser = new this.userModel({
            firstName,
            lastName,
            username,
            email,
            password: hashPassword
        })

        await newUser.save();

        const result: Object = {
            user: {
                firstName,
                lastName,
                username,
                email
            },
            registered: true
        }

        return result;
    }
}