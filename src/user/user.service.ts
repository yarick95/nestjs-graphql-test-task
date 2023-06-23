import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async create({name,role}: CreateUserInput) {
    const user = this.userRepository.create({
      name,
      role
    })
    return await this.userRepository.save(user);
  }

  findOne(id: number) {
    return this.userRepository.findOne({where:{id},relations:{
      blogs:true
    }});
  }

  async update({id,...updateData}: UpdateUserInput) {
    await this.userRepository.update({ id }, { ...updateData });

    return true;
  }

  async remove(id: number) {
    await this.userRepository.delete({id});
    return true
  }
}
