import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Query,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks') // The @Controller() decorator defines a controller.
// /tasks is the path prefix for all the routes defined in this controller.
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  // logger is an instance of the Logger class, which is a built-in NestJS
  private readonly logger = new Logger(TasksController.name);

  // The constructor() method defines a private tasksService property and
  // injects the TasksService dependency through the constructor.
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
    this.logger.verbose(
      `User ${user.username} creating a task. Payload: ${JSON.stringify(
        createTaskDto,
      )}`,
    );
    return this.tasksService.create(createTaskDto, user);
  }

  @Get()
  findAll(@Query() filterDto: GetTasksFilterDto, @GetUser() user: User) {
    this.logger.verbose(
      `User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.tasksService.findAll(filterDto, user);
  }

  @Get(':id')
  // :id is a route parameter.
  // It is a variable part of the route
  findOne(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User) {
    this.logger.log('Getting a task...');
    return this.tasksService.findOne(id, user);
  }

  // update task status by id
  @Patch(':id/status')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ) {
    this.logger.log('Updating a task status...');
    return this.tasksService.updateTaskStatus(id, updateTaskStatusDto, user);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,

    @GetUser() user: User,
  ) {
    this.logger.log('Deleting a task...');
    return this.tasksService.remove(id, user);
  }
}
