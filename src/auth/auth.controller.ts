import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(
        @Body('username') username: string,
        @Body('password') password: string
    ) : Promise<Object> {
        const result = await this.authService.login(username, password);

        return result;
    }

    @Post('register')
    async register(
        @Body('firstName') firstName: string,
        @Body('lastName') lastName: string,
        @Body('username') username: string,
        @Body('email') email: string,
        @Body('password') password: string 
    ) : Promise<Object> {
        const result = await this.authService.register(
                                                firstName, 
                                                lastName,
                                                username,
                                                email,
                                                password
                                            );
        
        return result;
    }           
}