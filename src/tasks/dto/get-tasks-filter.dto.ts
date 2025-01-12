import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum,';
// Dto for query params for filtering tasks
// ?status=OPEN&search=Some%20search%20query
export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  search: string;
}
