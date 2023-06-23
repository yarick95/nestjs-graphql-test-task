import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PostEntity } from 'src/post/entities/post.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class BlogEntity {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({type:"varchar"})
  name:String

  @Field(()=>[PostEntity],{nullable:true})
  @OneToMany(()=>PostEntity,(post)=>post.blog)
  posts:PostEntity[]

  @Field(()=>UserEntity)
  @ManyToOne(()=>UserEntity,(user)=>user.blogs)
  user:UserEntity
}
