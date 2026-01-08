import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './models/task.model';
import { Repository } from 'typeorm';
import { CreateTaskInput } from './types/task.input';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ){}

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find({
      order: { created_at: 'DESC' },
    })
  }

  async findById( id: string): Promise<Task | null>{
    return await this.taskRepository.findOne({
      where: {id}
    })
  }

  async create (input: CreateTaskInput) : Promise<Task>{
    const task = await this.taskRepository.create({
      title: input.title,
      description: input.description
    })
    return await this.taskRepository.save(task)
  }

  async markAsCompleted(id: string):Promise<Task>{
    const task = await this.findById(id);

    if (!task) throw new NotFoundException('Task not found');

    task.completed = true;
    return this.taskRepository.save(task);
  }

  async remove(id: string):Promise<boolean>{
    const result  = await this.taskRepository.delete(id);

    return result.affected ===1;
  }

}
