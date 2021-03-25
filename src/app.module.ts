import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { ToDoModule } from './ToDo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.CONNECT_STRING_TO_MONGO, { useNewUrlParser: true}),
    AuthModule, 
    ToDoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
