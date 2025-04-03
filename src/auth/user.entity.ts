import { Task } from '../tasks//task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    unique: true,
    nullable: false,
  })
  username: string;
  @Column({
    nullable: false,
  })
  password: string;

  // one user can have many tasks so we use one to many relationship
  // eager true means that when we fetch a user we get all the tasks associated with that user
  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
