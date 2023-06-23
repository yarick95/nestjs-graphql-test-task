import { Injectable } from '@nestjs/common';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { PostEntity } from 'src/post/entities/post.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private blogRepository: Repository<BlogEntity>,
    private userService: UserService,
  ) {}
  async create(createBlogInput: CreateBlogInput) {
    const user = await this.userService.findOne(createBlogInput.userId);
    const blog = this.blogRepository.create({
      name: createBlogInput.name,
      user,
    });
    return await this.blogRepository.save(blog);
  }

  findAll() {
    return this.blogRepository.find();
  }

  findOne(id: number) {
    return this.blogRepository.findOne({ where: { id } });
  }

  async update({ id, ...data }: UpdateBlogInput) {
    await this.blogRepository.update({ id }, { ...data });

    return true;
  }

  async remove(id: number) {
    await this.blogRepository.delete({ id });
    return true;
  }

  async getBlogPosts(blogId: number) {
    const blog = await this.blogRepository.findOne({
      where: { id: blogId },
      relations: { posts: true },
    });
    return blog.posts;
  }

  async getBlogUser(blogId: number) {
    const blog = await this.blogRepository.findOne({
      where: { id: blogId },
      relations: { user: true },
    });
    return blog.user;
  }

  async getBlogsByUserId(userId: number) {
    const blogs = await this.blogRepository.find({
      where: {
        user: { id: userId },
      },
    });
    return blogs;
  }

  public async addPostToBlog(blogId: number, post: PostEntity) {
    const blog = await this.blogRepository.findOne({
      where: { id: blogId },
      relations: { posts: true },
    });
    if(!blog.posts)
      blog.posts = [];
    blog.posts.push(post);
    return await this.blogRepository.save(blog);
  }
}
