import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/schemas/user.schema';
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
}
