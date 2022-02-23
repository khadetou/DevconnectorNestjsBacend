import { IsString, IsNotEmpty, IsOptional, IsDateString, IsBoolean } from 'class-validator';

export class CreateProfileDto {
	@IsString()
	@IsNotEmpty()
	company: string;

	@IsString()
	@IsNotEmpty()
	location: string;

	@IsString()
	@IsOptional()
	website: string;

	@IsString() status: string;

	@IsString()
	@IsOptional()
	description: string;

	@IsString()
	@IsOptional()
	githubusername: string;

	@IsString()
	@IsOptional()
	skills: string;

	@IsString() bio: string;

	@IsString()
	@IsOptional()
	youtube: string;

	@IsString()
	@IsOptional()
	twitter: string;

	@IsString()
	@IsOptional()
	facebook: string;

	@IsString()
	@IsOptional()
	linkedin: string;

	@IsString()
	@IsOptional()
	instagram: string;
}
