import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum,';

@Injectable()
// Custom Pipe to validate the status of a task
export class TaskStatusValidationPipe implements PipeTransform {
  private readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }
    return value;
  }
}
