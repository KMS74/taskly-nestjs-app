import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum,';
import { Injectable } from '@nestjs/common';

// Repository is supposed to work with your entity objects. Find entities, insert, update, delete, etc.
@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }
  //  define custom methods here
  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;
    // create a new task object
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    // save the task object to the database and return it
    return await this.save(task);
  }

  async getTasks(filterDto: GetTasksFilterDto) {
    const { status, search } = filterDto;
    // Creates a new query builder that can be used to build a SQL query.
    const query = this.createQueryBuilder('task');
    // if status is defined, add where clause
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    // if search is defined, add where clause
    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE LOWER(:search)',
        {
          search: `%${search}%`,
        },
      );
    }
    // execute the query
    const tasks = await query.getMany();
    return tasks;
  }
  async getAllOpenTasks() {
    const query = this.createQueryBuilder('task');
    query.andWhere('task.status = :status', { status: TaskStatus.OPEN });
    const tasks = await query.getMany();
    return tasks;
  }
}
