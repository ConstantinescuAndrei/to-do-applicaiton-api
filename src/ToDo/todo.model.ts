import * as mongoose from 'mongoose';

export const ToDoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String, required: true },
    username: { type: String, required: true },
    status: { type: String, required: true }
})

export interface ToDo extends mongoose.Document {
    id: string;
    title: string;
    content: string;
    date: string;
    username: string;
    status: string;
}