import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TaskStatus } from './task-status.enum,';

//  Defiling the entity using data mapper pattern
// https://typeorm.io/#/active-record-data-mapper/what-is-the-data-mapper-pattern

// The @Entity() decorator defines a class as a database table.
@Entity()
export class Task {
  // The @PrimaryGeneratedColumn() decorator defines a primary key column.
  @PrimaryGeneratedColumn('uuid')
  id: string;
  // The @Column() decorator defines a table column.
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  status: TaskStatus;
}
