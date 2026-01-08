import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './models/task.model';
import { Repository } from 'typeorm';
import { CreateTaskInput, UpdateTaskInput } from './types/task.input';
import { PaginationInput } from './types/pagination.input';
import { PaginatedTasks } from './types/paginated-tasks.type';
import { isValidUUID } from '../../shared/utils/uuid.util';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  async findPaginated(pagination: PaginationInput): Promise<PaginatedTasks> {
    const { limit = 10, offset = 0 } = pagination;

    const [tasks, total] = await this.taskRepository.findAndCount({
      order: { created_at: 'DESC' },
      take: limit,
      skip: offset,
    });

    return {
      tasks,
      total,
      limit,
      offset,
      hasNextPage: offset + limit < total,
    };
  }

  async findById(id: string): Promise<Task | null> {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid UUID format');
    }
    return await this.taskRepository.findOne({
      where: { id },
    });
  }

  async create(input: CreateTaskInput): Promise<Task> {
    const task = this.taskRepository.create(input);
    return await this.taskRepository.save(task);
  }

  async update(id: string, input: UpdateTaskInput): Promise<Task> {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid UUID format');
    }

    const task = await this.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    Object.assign(task, input);
    return await this.taskRepository.save(task);
  }

  async markAsCompleted(id: string): Promise<Task> {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid UUID format');
    }

    const task = await this.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    task.completed = true;
    return this.taskRepository.save(task);
  }

  async remove(id: string): Promise<boolean> {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid UUID format');
    }

    const result = await this.taskRepository.delete(id);
    return result.affected === 1;
  }
}
