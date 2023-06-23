import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BlogEntity } from 'src/blog/entities/blog.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class PostEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => BlogEntity)
  @ManyToOne(() => BlogEntity, (blog) => blog.posts)
  blog: BlogEntity;

  @Field()
  @Column({ type: 'varchar' })
  content: string;
}
