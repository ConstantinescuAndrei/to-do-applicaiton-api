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
        @Body('username') username: string,
    ) : Promise<Object> {
        const result = await this.todoService.createTodo(title, content, username);
        return result;
    }

    @Get('complete')
    async completeTodo(
        @Query('id') id: string, 
        @Query('username') username: string,
    ) : Promise<Object> {
        const response = await this.todoService.completeTodo(id, username);
        return response;
    }

    @Get('delete')
    async deleteTodo(
        @Query('id') id: string,
        @Query('username') username: string
    ) : Promise<Object> {
        const response = await this.todoService.delete(id, username);
        return response;
    }
}