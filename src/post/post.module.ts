import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { UserModule } from 'src/user/user.module';
import { BlogModule } from 'src/blog/blog.module';

@Module({
  imports:[TypeOrmModule.forFeature([PostEntity]),UserModule,BlogModule],
  providers: [PostResolver, PostService]
})
export class PostModule {}
