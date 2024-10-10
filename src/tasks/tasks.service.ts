import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}
  create(createTaskDto: CreateTaskDto) {
    return this.taskRepository.createTask(createTaskDto);
  }

  findAll(filterDto: GetTasksFilterDto) {
    return this.taskRepository.getTasks(filterDto);
  }

  async findOne(id: string) {
    const task = await this.taskRepository.findOneBy({
      id,
    });
    if (!task) {
      throw new NotFoundException(`Task with Id ${id} not found`);
    }

    return task;
  }

  async updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto) {
    const { status } = updateTaskStatusDto;
    const task = await this.findOne(id);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }

  async remove(id: string) {
    const deletedResult = await this.taskRepository.delete(id);
    if (deletedResult.affected === 0) {
      throw new NotFoundException(`Task with Id ${id} not found`);
    }
  }
}
