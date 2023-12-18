import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'taskmanagement',
  entities: [__dirname + '/../**/*.entity.js'], // any file in the src dir ends with .entity.ts
  synchronize: true,
};
