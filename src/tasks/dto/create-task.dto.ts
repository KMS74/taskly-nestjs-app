import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  description: string;
}

// DTO is a design pattern. It stands for Data Transfer Object. It is an object that
// carries data between processes. In the context of NestJS, it is an object that
// defines how the data will be sent over the network. It is used to validate the data
// sent over the network. It is used to define the shape of the data sent over the
// network.

// DTO it is NOT model definition, it defines the shape of the data for specific case (create, update, delete, etc)
// for example, we can have a model with 10 fields, but for create we need only 2 fields, so we create dto with 2 fields

// the recommended way to create a DTO is to use classes with decorators.
// The decorators are used to define the validation rules.
