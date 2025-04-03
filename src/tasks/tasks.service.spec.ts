import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOneBy: jest.fn(),
});

const mockUser = {
  username: 'karim',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
};
describe('TasksService', () => {
  let taskservice: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    // initialize a Nest.js module with task service and repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TaskRepository,
          useFactory: mockTasksRepository,
        },
      ],
    }).compile();

    taskservice = module.get<TasksService>(TasksService);
    tasksRepository = module.get<TaskRepository>(TaskRepository);
  });

  it('should be defined', () => {
    expect(taskservice).toBeDefined();
  });

  describe('find tasks', () => {
    it('calls TasksRepository.getTasks and returns the results', async () => {
      tasksRepository.getTasks.mockResolvedValue('someValue');
      const results = await taskservice.findAll(null, mockUser);
      expect(results).toEqual('someValue');
    });
  });

  describe('find task by id', () => {
    it('calls TasksRepository.findOne and returns the result', async () => {
      const mockTask = {
        title: 'task title',
        description: 'task description',
        id: 'taskId',
        status: TaskStatus.OPEN,
      };

      tasksRepository.findOneBy.mockResolvedValue(mockTask);

      const task = await taskservice.findOne('taskId', mockUser);
      expect(task).toEqual(mockTask);
    });

    it('calls TasksRepository.findOne and handles an error', async () => {
      tasksRepository.findOneBy.mockResolvedValue(null);
      expect(taskservice.findOne('taskId', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
