import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Injectable } from '@nestjs/common';
import { User } from '../auth/user.entity';

// Repository is supposed to work with your entity objects. Find entities, insert, update, delete, etc.
@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }
  //  Define custom methods here to interact with the database

  async createTask(createTaskDto: CreateTaskDto, user: User) {
    const { title, description } = createTaskDto;
    // create a new task object
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN, // default status is OPEN
      user,
    });

    // save the task object to the database and return it
    return await this.save(task);
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User) {
    const { status, search } = filterDto;
    // Creates a new query builder that can be used to build a SQL query.
    const query = this.createQueryBuilder('task');
    // get all tasks that belong to the user
    query.where({ user });
    // if status is defined, add where clause
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    // if search is defined, add where clause
    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
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
