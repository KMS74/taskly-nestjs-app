import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  // CreateDateColumn,
  // UpdateDateColumn,
} from 'typeorm';
import { TaskStatus } from './task-status.enum,';

//  defiling the entity using data mapper pattern
// https://typeorm.io/#/active-record-data-mapper/what-is-the-data-mapper-pattern

@Entity() // The @Entity() decorator defines a class as a database table.
export class Task {
  @PrimaryGeneratedColumn('uuid') // The @PrimaryGeneratedColumn() decorator defines a primary key column.
  id: string;
  @Column() // The @Column() decorator defines a table column.
  title: string;
  @Column()
  description: string;
  @Column()
  status: TaskStatus;
  // @CreateDateColumn() // The @CreateDateColumn() decorator defines a column that stores the entity creation date.
  // createdAt: Date;
  // @UpdateDateColumn()
  // updatedAt: Date;
}
