import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Post, PostSchema } from './schemas/post.schema';

@Module({
	imports: [ MongooseModule.forFeature([ { name: Post.name, schema: PostSchema } ]), AuthModule ],
	providers: [ PostService ],
	controllers: [ PostController ]
})
export class PostModule {}
