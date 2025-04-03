import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum';
import { ApiProperty } from '@nestjs/swagger';
// Dto for query params for filtering tasks
// ?status=OPEN&search=Some%20search%20query
export class GetTasksFilterDto {
  @ApiProperty()
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  search: string;
}
