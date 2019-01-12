import * as faker from 'faker';
import { User } from '../../../modules/users/entity/user.entity';
import * as crypto from 'crypto';
import { INestApplication } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import {Status} from '../../../modules/users/enum/status.enum';

export class UserSeed  {
  public static async up(app: INestApplication) {
      const usersRepository = app.get('UserRepository');
      const insertData = [];

      for (let i = 0; i < 10; i += 1) {

        const user = new User();

        user.id = uuid();
        user.name = faker.name.findName();
        user.password = crypto.createHmac('sha256', 'test').digest('hex');
        user.email = `user${i}@test.com`;
        user.status = Status.Active;

        insertData.push(usersRepository.save(user));
      }
      await Promise.all(insertData);
  }

  public static async down(app: INestApplication) {
      const usersRepository = app.get('UserRepository');
      await usersRepository.delete(await usersRepository.find());
  }
}
