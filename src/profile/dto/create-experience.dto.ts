import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsDate, IsDateString } from 'class-validator';

export class CreateExperienceDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsNotEmpty()
	company: string;

	@IsString()
	@IsNotEmpty()
	location: string;

	@IsString()
	@IsNotEmpty()
	@IsDateString()
	from: Date;

	@IsString()
	@IsOptional()
	@IsDateString()
	to: Date;

	@IsBoolean()
	@IsOptional()
	current: boolean;

	@IsString()
	@IsOptional()
	description: string;
}
