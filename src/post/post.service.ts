import { Injectable, UseGuards } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PostEntity } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesGuard } from 'src/guards/role.guard';
import { BlogService } from 'src/blog/blog.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    private blogService: BlogService,
  ) {}

  async create({ blogId, content }: CreatePostInput) {
    const post = this.postRepository.create({ content });
    const blog = await this.blogService.addPostToBlog(blogId, post);
    post.blog = blog;
    return await this.postRepository.save(post);
  }

  findOne(id: number) {
    return this.postRepository.findOne({
      where: { id },
      relations: { blog: { user: true } },
    });
  }

  async update({ id, ...data }: UpdatePostInput) {
    await this.postRepository.update({ id }, { ...data });
    return true;
  }

  async remove(id: number) {
    await this.postRepository.delete({ id })

    return true;
  }
}
