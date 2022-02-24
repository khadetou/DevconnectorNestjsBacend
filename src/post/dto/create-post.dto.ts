import { IsNotEmpty, IsString } from 'class-validator';

export class createPostDto {
	@IsString()
	@IsNotEmpty()
	text: string;

	@IsString()
	@IsNotEmpty()
	name: string;
}
