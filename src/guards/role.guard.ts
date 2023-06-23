import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PostService } from 'src/post/post.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

export const RolesGuard = (role: String) => {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    constructor(
      public userService: UserService,
      public postService: PostService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const ctx = GqlExecutionContext.create(context);
      const { req } = ctx.getContext();

      const userId = req.headers.auth;

      const user = await this.userService.findOne(userId);
      if (role == user.role && role == 'Moderator') return true;

      let blogId:number,id:number;
      let argsObj = ctx.getArgs();
      for (const key in argsObj) {
        if(key=='blogId'){
          blogId = argsObj[key];
          break;
        }else if(key=='id'){
          id = argsObj[key];
          break;
        }
      }
      
      if(blogId){
        return this.validateByBlogId(user,blogId)
      }else{
        return this.validateByPostId(user,id)
      }



    }
    public async validateByBlogId(user:UserEntity,blogId:number){
      const isOwnBlog = user.blogs.find((elem) => elem.id == blogId);
      if (isOwnBlog) return true;

      return false;
    }
    public async validateByPostId(user:UserEntity,postId:number){
      const post = await this.postService.findOne(postId);

      if(post.blog.user.id == user.id) return true
      

      return false;
    }
  }

  const guard = mixin(RoleGuardMixin);
  return guard;
};
