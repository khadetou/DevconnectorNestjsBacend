import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { BadRequestException } from '@nestjs/common';
@Injectable()
export class PostService {
	constructor(@InjectModel(Post.name) private readonly postModel: Model<PostDocument>) {}

	//Create post
	async createPost(createPostDto: CreatePostDto, user: any): Promise<Post> {
		const { text, name } = createPostDto;
		const post = new this.postModel({
			text,
			name,
			avatar: user.avatar,
			user: user._id
		});

		try {
			return await post.save();
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}

	//Get all posts
	async getPosts(): Promise<Post[]> {
		return await this.postModel.find().exec();
	}

	//Get post by id
	async getPostById(id: string): Promise<Post> {
		try {
			return await this.postModel.findById(id).exec();
		} catch (error) {
			throw new NotFoundException('Post not found with id: ' + id);
		}
	}

	//Delete post by id
	async deletePostById(id: string, user: any): Promise<Post> {
		const post = await this.postModel.findById(id).exec();
		if (post.user.toString() !== user._id) {
			throw new UnauthorizedException('You are not authorized to delete this post');
		}
		try {
			return await post.remove();
		} catch (error) {
			throw new NotFoundException('Post not found with id: ' + id);
		}
	}

	//Like a post
	async likePost(id: string, user: any): Promise<Post> {
		const post = await this.postModel.findById(id).exec();
		//METHOD 1

		if (post.likes.filter((like) => like.user.toString() === user._id.toString()).length > 0) {
			throw new BadRequestException('You already liked this post');
		}
		post.likes.unshift({ user: user._id });

		//METHOD 2 shorter
		// if(post.likes.includes(user._id)){
		//     throw new BadRequestException('You already liked this post');
		// }
		// post.likes.unshift(user._id);

		try {
			return await post.save();
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}

	//Unlike a post
	async unlikePost(id: string, user: any): Promise<Post> {
		const post = await this.postModel.findById(id).exec();
		if (post.likes.filter((like) => like.user.toString() === user._id.toString()).length === 0) {
			throw new BadRequestException('You have not liked this post');
		}

		const removeIndex = post.likes.map((like) => like.user.toString()).indexOf(user._id);
		post.likes.splice(removeIndex, 1);
		try {
			return await post.save();
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}

	//Comment on a post
	async commentPost(CreatePostDto: CreatePostDto, id: string, user: any): Promise<Post> {
		const { text, name } = CreatePostDto;
		const post = await this.postModel.findById(id).exec();
		post.comments.unshift({
			text,
			name,
			avatar: user.avatar,
			user: user._id
		});
		try {
			return await post.save();
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}

	//Delete comment on a post
	async deleteCommentPost(id: string, commentId: string, user: any) {
		const post = await this.postModel.findById(id).exec();
		const comment = post.comments.find((comment) => comment._id.toString() === commentId);

		if (!comment) {
			throw new NotFoundException('Comment not found');
		}

		if (comment.user.toString() !== user._id.toString()) {
			throw new UnauthorizedException('You are not authorized to delete this comment');
		}

		const removeIndex = post.comments.map((comment) => comment._id.toString()).indexOf(user._id);
		post.comments.splice(removeIndex, 1);
		try {
			return await post.save();
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}
}
