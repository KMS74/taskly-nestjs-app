import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum';
import { ApiProperty } from '@nestjs/swagger';
// Dto for query params for filtering tasks
// ?status=OPEN&search=Some%20search%20query
export class GetTasksFilterDto {
  @ApiProperty({
    required: false,
    enum: TaskStatus,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  search: string;
}
