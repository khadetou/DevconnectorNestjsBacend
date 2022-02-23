import { Body, Controller, Post } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileService } from './profile.service';
import { Profile } from './schemas/profile.schema';

@Controller('profile')
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	@Post()
	async createProfile(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
		return this.profileService.create(createProfileDto);
	}
}
