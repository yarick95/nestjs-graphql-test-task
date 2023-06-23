import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { BlogEntity } from './entities/blog.entity';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { PostEntity } from 'src/post/entities/post.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Resolver(() => BlogEntity)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @Mutation(()=>BlogEntity,{nullable:true})
  async createBlog(@Args('createBlogInput') createBlogInput: CreateBlogInput):Promise<BlogEntity> {
    
    return this.blogService.create(createBlogInput);
  }

  @Query(() => [BlogEntity], { name: 'blogs' })
  findAll() {
    return this.blogService.findAll();
  }

  @Query(() => [BlogEntity], { name: 'blogsUser' })
  findByUserId(@Args('userId', { type: () => Int }) userId:number) {
    return this.blogService.getBlogsByUserId(userId);
  }

  @Query(() => BlogEntity, { name: 'blog',nullable:true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.blogService.findOne(id);
  }

  @ResolveField(() => [PostEntity])
  async blogPosts(@Parent() blog:BlogEntity) {
    const { id } = blog;
    return this.blogService.getBlogPosts(id);
  }

  @ResolveField(() => [UserEntity])
  async blogUser(@Parent() blog:BlogEntity) {
    const { id } = blog;
    return this.blogService.getBlogUser(id);
  }

  @Mutation(() => Boolean)
  async updateBlog(@Args('updateBlogInput') updateBlogInput: UpdateBlogInput) {
    return this.blogService.update(updateBlogInput);
  }

  @Mutation(() => Boolean)
  async removeBlog(@Args('id', { type: () => Int }) id: number) {
    return this.blogService.remove(id);
  }
}
