import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { ToDoSchema } from './todo.model';
import { ToDoController } from './todo.controller';
import { ToDoService } from './todo.service';

@Module({
    imports: [
        ConfigModule.forRoot(), 
        MongooseModule.forFeature([
            { name: 'Todos', schema: ToDoSchema }
        ])
    ],
    controllers: [ToDoController],
    providers: [ToDoService]
})
export class ToDoModule {}