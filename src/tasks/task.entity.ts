import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TaskStatus } from './task-status.enum,';
import { User } from '../auth/user.entity';
import { Exclude } from 'class-transformer';

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

  // many tasks can belong to one user so we use many to one relationship
  // eager false means that when we fetch a task we don't get the user associated with that task
  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  @Exclude({
    toPlainOnly: true, // exclude the user property when returning the task object
  })
  user: User;
}
