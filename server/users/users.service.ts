import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { MongooseCrudService } from '../mongoose-crud-service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends MongooseCrudService<User> {
  constructor(
    @InjectRepository(User) protected readonly repo: MongoRepository<User>
  ) {
    super(repo);
  }
}
