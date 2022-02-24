import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/schemas/user.schema';
import { CreateEducationDto } from './dto/create-education.dto';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileService } from './profile.service';
import { Profile } from './schemas/profile.schema';

@Controller('profile')
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	//Create / Update Profile
	@Post()
	@UseGuards(AuthGuard())
	async createProfile(@Body() createProfileDto: CreateProfileDto, @GetUser() user: User): Promise<Profile> {
		return this.profileService.create(createProfileDto, user);
	}

	//Get my profile
	@Get('/me')
	@UseGuards(AuthGuard())
	async getMyProfile(@GetUser() user: User): Promise<Profile> {
		return this.profileService.getMyProfile(user);
	}

	//Get all profiles
	@Get()
	async getAllProfiles(): Promise<Profile[]> {
		return this.profileService.getAllProfiles();
	}

	//Get profile by user id
	@Get('/user/:userId')
	async getProfileByUserId(@Param('userId') userId: string): Promise<Profile> {
		return this.profileService.getProfileById(userId);
	}

	//Delete profile
	@Delete('/delete')
	@UseGuards(AuthGuard())
	async deleteProfile(@GetUser() user: User): Promise<void> {
		return this.profileService.deleteProfile(user);
	}

	//Add Experience
	@Put('/experience')
	@UseGuards(AuthGuard())
	async addExperience(@Body() createExperienceDto: CreateExperienceDto, @GetUser() user: User): Promise<Profile> {
		return this.profileService.addExperience(createExperienceDto, user);
	}

	//Delete Experience
	@Delete('/experience/:expId')
	@UseGuards(AuthGuard())
	async deleteExperience(@Param('expId') expId: string, @GetUser() user: User): Promise<{ message: string }> {
		return this.profileService.deleteExperience(user, expId);
	}

	//Add Education
	@Put('/education')
	@UseGuards(AuthGuard())
	async addEducation(@Body() createEducationDto: CreateEducationDto, @GetUser() user: User): Promise<Profile> {
		return this.profileService.addEducation(createEducationDto, user);
	}

	//Delete Education
	@Delete('/education/:eduId')
	@UseGuards(AuthGuard())
	async deleteEducation(@Param('eduId') eduId: string, @GetUser() user: User): Promise<{ message: string }> {
		return this.profileService.deleteEducation(user, eduId);
	}
}
