import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Task } from '../models/task.model';

@ObjectType()
export class PaginatedTasks {
  @Field(() => [Task])
  tasks: Task[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  offset: number;

  @Field(() => Boolean)
  hasNextPage: boolean;
}
