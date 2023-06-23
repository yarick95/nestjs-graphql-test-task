import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BlogEntity } from 'src/blog/entities/blog.entity';
import { PostEntity } from 'src/post/entities/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class UserEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({type:"varchar"})
  name:String

  @Field()
  @Column()//set enum here
  role:String

  @Field(()=>[BlogEntity],{nullable:true})
  @OneToMany(()=>BlogEntity,(post)=>post.user)
  blogs:BlogEntity[]
}
