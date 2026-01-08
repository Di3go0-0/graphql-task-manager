import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { Task } from './models/task.model';
import { DatabaseModule } from '../../shared/database/database.module';
import { TaskResolver } from './task.resolver';

@Module({
  imports: [
    DatabaseModule, 
    TypeOrmModule.forFeature([Task])
  ],
  providers: [TaskService, TaskResolver]
})
export class TaskModule {}
