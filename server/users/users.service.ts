import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongooseCrudService } from 'server/mongoose-crud-service';
import { MongoRepository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends MongooseCrudService<User> {
  constructor(
    @InjectRepository(User) protected readonly repo: MongoRepository<User>
  ) {
    super(repo);
  }
}
