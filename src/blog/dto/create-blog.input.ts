import { InputType, Int, Field } from '@nestjs/graphql';
import { PostEntity } from 'src/post/entities/post.entity';

@InputType()
export class CreateBlogInput {
  @Field()
  name: String;

  @Field()
  userId:number
}
