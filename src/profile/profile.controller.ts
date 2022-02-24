import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/schemas/user.schema';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileService } from './profile.service';
import { Profile } from './schemas/profile.schema';

@Controller('profile')
@UseGuards(AuthGuard())
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	@Post()
	async createProfile(@Body() createProfileDto: CreateProfileDto, @GetUser() user: User): Promise<Profile> {
		return this.profileService.create(createProfileDto, user);
	}
}
