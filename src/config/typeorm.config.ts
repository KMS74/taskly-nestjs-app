import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from 'src/tasks/task.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'taskmanagement',
  entities: [Task],
  // entities: [__dirname + '/../**/*.entity.js'], // any file in the src dir ends with .entity.ts
  synchronize: true,
};
