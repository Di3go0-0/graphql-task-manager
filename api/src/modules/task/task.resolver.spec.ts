import { Test, TestingModule } from '@nestjs/testing';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';
import { Task } from './models/task.model';
import { CreateTaskInput } from './types/task.input';

describe('TaskResolver', () => {
  let resolver: TaskResolver;

  const mockTask: Task = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockService = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    markAsCompleted: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskResolver,
        {
          provide: TaskService,
          useValue: mockService,
        },
      ],
    }).compile();

    resolver = module.get<TaskResolver>(TaskResolver);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('tasks query', () => {
    it('should return an array of tasks', async () => {
      const tasks = [mockTask];
      mockService.findAll.mockResolvedValue(tasks);

      const result = await resolver.tasks();

      expect(result).toEqual(tasks);
      expect(mockService.findAll).toHaveBeenCalled();
    });
  });

  describe('task query', () => {
    it('should return a task by id', async () => {
      mockService.findById.mockResolvedValue(mockTask);

      const result = await resolver.task(mockTask.id);

      expect(result).toEqual(mockTask);
      expect(mockService.findById).toHaveBeenCalledWith(mockTask.id);
    });

    it('should return null when task not found', async () => {
      mockService.findById.mockResolvedValue(null);

      const result = await resolver.task('non-existent-id');

      expect(result).toBeNull();
      expect(mockService.findById).toHaveBeenCalledWith('non-existent-id');
    });
  });

  describe('createTask mutation', () => {
    const createTaskInput: CreateTaskInput = {
      title: 'New Task',
      description: 'New Description',
    };

    it('should create and return a new task', async () => {
      const newTask = { ...mockTask, ...createTaskInput };
      mockService.create.mockResolvedValue(newTask);

      const result = await resolver.createTask(createTaskInput);

      expect(result).toEqual(newTask);
      expect(mockService.create).toHaveBeenCalledWith(createTaskInput);
    });
  });

  describe('completeTask mutation', () => {
    it('should mark a task as completed and return it', async () => {
      const completedTask = { ...mockTask, completed: true };
      mockService.markAsCompleted.mockResolvedValue(completedTask);

      const result = await resolver.completeTask(mockTask.id);

      expect(result).toEqual(completedTask);
      expect(mockService.markAsCompleted).toHaveBeenCalledWith(mockTask.id);
    });
  });

  describe('deleteTask mutation', () => {
    it('should delete a task and return true', async () => {
      mockService.remove.mockResolvedValue(true);

      const result = await resolver.deleteTask(mockTask.id);

      expect(result).toBe(true);
      expect(mockService.remove).toHaveBeenCalledWith(mockTask.id);
    });

    it('should return false when task not found for deletion', async () => {
      mockService.remove.mockResolvedValue(false);

      const result = await resolver.deleteTask('non-existent-id');

      expect(result).toBe(false);
      expect(mockService.remove).toHaveBeenCalledWith('non-existent-id');
    });
  });
});
