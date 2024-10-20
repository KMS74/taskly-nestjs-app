import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}
  create(createTaskDto: CreateTaskDto, user: User) {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  findAll(filterDto: GetTasksFilterDto, user: User) {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async findOne(id: string, user: User) {
    const task = await this.taskRepository.findOneBy({
      id,
      user,
    });
    if (!task) {
      throw new NotFoundException(`Task with Id ${id} not found`);
    }

    return task;
  }

  async updateTaskStatus(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
    user: User,
  ) {
    const { status } = updateTaskStatusDto;
    const task = await this.findOne(id, user);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }

  async remove(id: string, user: User) {
    const deletedResult = await this.taskRepository.delete({
      id,
      user,
    });
    if (deletedResult.affected === 0) {
      throw new NotFoundException(`Task with Id ${id} not found`);
    }
  }
}
