import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { ToDo } from './todo.model';

@Injectable()
export class ToDoService {
    constructor(
        @InjectModel('Todos') private readonly todoModel: Model<ToDo>
    ) {}
    

    async getTodos(username: string) : Promise<Object> {     
        const response = await this.todoModel.find({ username }).exec();
        if(response.length > 0) {  
            const result: Object = {
                todos: response,
                error: null
            }
            return result;
        }
        const result: Object = {
            todos: {}, 
            error: "Something happened while getting data from database"
        }
        return result;
    }

    async createTodo(
        title: string, 
        content: string, 
        username: string,
        ) : Promise<Object> {                 
            const date = new Date().toDateString();

            const newTodo = new this.todoModel({
                title, 
                content,
                date, 
                username,
                status: 'pending',
            })

            await newTodo.save();

            const result: Object = {
                todo: { 
                    title, 
                    content, 
                    date, 
                    username,
                    status: 'pending'
                },
                added: true
            };

            return result;
        } 

    async completeTodo(
        id: string,
        username: string
    ) : Promise<Object> {
        await this.todoModel.findOneAndUpdate({ _id: id }, { status: 'complete' })
        const response = await this.getTodos(username);
        const result: Object = {
            todos: response['todos']
        }
        return result;
    }
}