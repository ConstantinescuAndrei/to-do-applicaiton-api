import { Controller, Get, Post, Body, Query, Headers } from '@nestjs/common';
import { Request } from 'express';
import { ToDoService } from './todo.service';

@Controller("todo")
export class ToDoController {
    constructor(private readonly todoService: ToDoService) {}

    @Get()
    async getTodos(@Headers() headers) : Promise<Object> {
        const username = headers.username;
        const result = await this.todoService.getTodos(username);
        return result;
    }

    @Post('createTodo')
    async createTodo(
        @Headers() headers,
        @Body('title') title: string,
        @Body('content') content: string, 
    ) : Promise<Object> {
        const username = headers.username;
        const result = await this.todoService.createTodo(title, content, username);
        return result;
    }

    @Get('complete')
    async completeTodo(
        @Query('id') id: string, 
        @Query('username') username: string,
    ) : Promise<Object> {
        console.log("Here")
        const response = await this.todoService.completeTodo(id, username);
        return response;
    }
}