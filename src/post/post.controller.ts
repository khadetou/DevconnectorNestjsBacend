import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/schemas/user.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { Post as Posts } from './schemas/post.schema';

@Controller('post')
export class PostController {
	constructor(private readonly postService: PostService) {}

	//Create post
	@Post()
	@UseGuards(AuthGuard())
	async createPost(@Body() createPostDto: CreatePostDto, @GetUser() user: User): Promise<Posts> {
		return this.postService.createPost(createPostDto, user);
	}

	//Get all posts
	@Get()
	async getPosts(): Promise<Posts[]> {
		return this.postService.getPosts();
	}

	//Get post by id
	@Get(':id')
	@UseGuards(AuthGuard())
	async getPostById(@Param('id') id: string): Promise<Posts> {
		return this.postService.getPostById(id);
	}

	//Delete post by id
	@Delete(':id')
	@UseGuards(AuthGuard())
	async deletePostById(@Param('id') id: string, @GetUser() user: User): Promise<Posts> {
		return this.postService.deletePostById(id, user);
	}

	//Like a post
	@Put('/like/:id')
	@UseGuards(AuthGuard())
	async likePost(@Param('id') id: string, @GetUser() user: User): Promise<Posts> {
		return this.postService.likePost(id, user);
	}

	//Unlike a post
	@Put('/unlike/:id')
	@UseGuards(AuthGuard())
	async unlikePost(@Param('id') id: string, @GetUser() user: User): Promise<Posts> {
		return this.postService.unlikePost(id, user);
	}

	//Create comment
	@Post('/comment/:id')
	@UseGuards(AuthGuard())
	async createComment(
		@Body() createPostDto: CreatePostDto,
		@Param('id') id: string,
		@GetUser() user: User
	): Promise<Posts> {
		return this.postService.commentPost(createPostDto, id, user);
	}

	//Delete comment
	@Delete('/comment/:id/:commentId')
	@UseGuards(AuthGuard())
	async deleteComment(
		@Param('id') id: string,
		@Param('commentId') commentId: string,
		@GetUser() user: User
	): Promise<Posts> {
		return this.postService.deleteCommentPost(id, commentId, user);
	}
}
