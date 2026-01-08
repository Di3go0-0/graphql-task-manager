import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { Task } from './models/task.model';
import { CreateTaskInput } from './types/task.input';
import { NotFoundException } from '@nestjs/common';

describe('TaskService', () => {
  let service: TaskService;

  const mockTask: Task = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tasks ordered by created_at DESC', async () => {
      const tasks = [mockTask];
      mockRepository.find.mockResolvedValue(tasks);

      const result = await service.findAll();

      expect(result).toEqual(tasks);
      expect(mockRepository.find).toHaveBeenCalledWith({
        order: { created_at: 'DESC' },
      });
    });

    it('should return empty array when no tasks exist', async () => {
      mockRepository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(mockRepository.find).toHaveBeenCalledWith({
        order: { created_at: 'DESC' },
      });
    });
  });

  describe('findById', () => {
    it('should return a task when found', async () => {
      mockRepository.findOne.mockResolvedValue(mockTask);

      const result = await service.findById(
        '123e4567-e89b-12d3-a456-426614174000',
      );

      expect(result).toEqual(mockTask);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '123e4567-e89b-12d3-a456-426614174000' },
      });
    });

    it('should return null when task not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const result = await service.findById(
        '123e4567-e89b-12d3-a456-426614174000',
      );

      expect(result).toBeNull();
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '123e4567-e89b-12d3-a456-426614174000' },
      });
    });
  });

  describe('create', () => {
    const createTaskInput: CreateTaskInput = {
      title: 'New Task',
      description: 'New Description',
    };

    it('should create and return a new task', async () => {
      const newTask = { ...mockTask, ...createTaskInput };
      mockRepository.create.mockReturnValue(newTask);
      mockRepository.save.mockResolvedValue(newTask);

      const result = await service.create(createTaskInput);

      expect(result).toEqual(newTask);
      expect(mockRepository.create).toHaveBeenCalledWith({
        title: createTaskInput.title,
        description: createTaskInput.description,
      });
      expect(mockRepository.save).toHaveBeenCalledWith(newTask);
    });

    it('should create a task without description', async () => {
      const inputWithoutDescription = { title: 'Task without description' };
      const newTask = { ...mockTask, ...inputWithoutDescription };
      mockRepository.create.mockReturnValue(newTask);
      mockRepository.save.mockResolvedValue(newTask);

      const result = await service.create(inputWithoutDescription);

      expect(result).toEqual(newTask);
      expect(mockRepository.create).toHaveBeenCalledWith({
        title: inputWithoutDescription.title,
        description: undefined,
      });
    });
  });

  describe('markAsCompleted', () => {
    it('should mark a task as completed and return it', async () => {
      const incompleteTask = { ...mockTask, completed: false };
      const completedTask = { ...mockTask, completed: true };

      mockRepository.findOne.mockResolvedValue(incompleteTask);
      mockRepository.save.mockResolvedValue(completedTask);

      const result = await service.markAsCompleted(mockTask.id);

      expect(result).toEqual(completedTask);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockTask.id },
      });
      expect(mockRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ completed: true }),
      );
    });

    it('should throw NotFoundException when task not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(
        service.markAsCompleted('123e4567-e89b-12d3-a456-426614174000'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a task and return true', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(
        '123e4567-e89b-12d3-a456-426614174000',
      );

      expect(result).toBe(true);
      expect(mockRepository.delete).toHaveBeenCalledWith(
        '123e4567-e89b-12d3-a456-426614174000',
      );
    });

    it('should return false when task not found for deletion', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 0 });

      const result = await service.remove(
        '123e4567-e89b-12d3-a456-426614174000',
      );

      expect(result).toBe(false);
      expect(mockRepository.delete).toHaveBeenCalledWith(
        '123e4567-e89b-12d3-a456-426614174000',
      );
    });
  });
});
