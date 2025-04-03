import { CreateTaskDto } from './create-task.dto';
import { IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { TaskStatus } from '../task-status.enum';

// The PartialType() function creates a new class that extends the original
// UpdateTaskDto class with all the properties set to optional.
export class UpdateTaskDto extends PartialType(CreateTaskDto) {}

export class UpdateTaskStatusDto {
  // validate that the status is one of the values from the TaskStatus enum
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
