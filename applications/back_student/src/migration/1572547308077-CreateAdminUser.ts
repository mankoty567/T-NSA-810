import {getRepository, MigrationInterface, QueryRunner} from 'typeorm';
import {User} from '../entity/User';
import * as dotenv from 'dotenv';
dotenv.config();

export class CreateAdminUser1572547308077 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const user = new User();
    user.username = process.env.USERNAME;
    user.password = process.env.PASSWORD;
    user.hashPassword();
    user.role = process.env.ROLE;
    const userRepository = getRepository(User);
    await userRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
