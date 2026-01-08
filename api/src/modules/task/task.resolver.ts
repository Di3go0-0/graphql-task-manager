import { Args, Mutation, Query, Resolver, ID } from '@nestjs/graphql';
import { Task } from './models/task.model';
import { TaskService } from './task.service';
import { CreateTaskInput, UpdateTaskInput } from './types/task.input';
import { PaginationInput } from './types/pagination.input';
import { PaginatedTasks } from './types/paginated-tasks.type';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [Task])
  async tasks(): Promise<Task[]> {
    return await this.taskService.findAll();
  }

  @Query(() => PaginatedTasks)
  async paginatedTasks(
    @Args('pagination') pagination: PaginationInput,
  ): Promise<PaginatedTasks> {
    return await this.taskService.findPaginated(pagination);
  }

  @Query(() => Task, { nullable: true })
  async task(@Args('id', { type: () => ID }) id: string): Promise<Task | null> {
    return await this.taskService.findById(id);
  }

  @Mutation(() => Task)
  async createTask(@Args('input') input: CreateTaskInput): Promise<Task> {
    return await this.taskService.create(input);
  }

  @Mutation(() => Task)
  async updateTask(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateTaskInput,
  ): Promise<Task> {
    return await this.taskService.update(id, input);
  }

  @Mutation(() => Task)
  async completeTask(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Task> {
    return await this.taskService.markAsCompleted(id);
  }

  @Mutation(() => Boolean)
  async deleteTask(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.taskService.remove(id);
  }
}
