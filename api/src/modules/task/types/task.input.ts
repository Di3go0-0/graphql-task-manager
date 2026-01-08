import { Field, InputType } from '@nestjs/graphql';
import {
  IsString,
  IsOptional,
  MaxLength,
  MinLength,
  IsBoolean,
} from 'class-validator';

@InputType()
export class CreateTaskInput {
  @Field()
  @IsString()
  @MinLength(1, { message: 'Title is required' })
  @MaxLength(255, { message: 'Title must be less than 255 characters' })
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(1000, { message: 'Description must be less than 1000 characters' })
  description?: string;
}

@InputType()
export class UpdateTaskInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Title must have at least 1 character if provided' })
  @MaxLength(255, { message: 'Title must be less than 255 characters' })
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(1000, { message: 'Description must be less than 1000 characters' })
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
