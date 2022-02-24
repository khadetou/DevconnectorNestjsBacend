import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEducationDto {
	@IsString()
	@IsNotEmpty()
	school: string;
	@IsString()
	@IsNotEmpty()
	degree: string;
	@IsString()
	@IsNotEmpty()
	fieldofstudy: string;
	@IsString()
	@IsNotEmpty()
	@IsDateString()
	from: Date;
	@IsString()
	@IsOptional()
	@IsDateString()
	to: Date;
	@IsString()
	@IsOptional()
	current: boolean;
	@IsString()
	@IsOptional()
	description: string;
}
