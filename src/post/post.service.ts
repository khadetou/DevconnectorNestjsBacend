import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { Model } from 'mongoose';
@Injectable()
export class PostService {
	constructor(@InjectModel(Post.name) private readonly postModel: Model<PostDocument>) {}
}
