import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile, ProfileDocument } from './schemas/profile.schema';
import { Model } from 'mongoose';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfileService {
	constructor(@InjectModel(Profile.name) private readonly profileModel: Model<ProfileDocument>) {}

	async create(createProfileDto: CreateProfileDto): Promise<Profile> {
		let {
			company,
			website,
			location,
			bio,
			status,
			githubusername,
			skills,
			youtube,
			facebook,
			twitter,
			instagram,
			linkedin
		} = createProfileDto;

		let splitSkills: string[];
		if (skills) {
			splitSkills = skills.split(',').map((skill) => skill.trim());
		}

		const profile = new this.profileModel({
			company: company && company,
			website: website && website,
			location: location && location,
			bio: bio && bio,
			status: status && status,
			githubusername: githubusername && githubusername,
			skills: skills && splitSkills,
			social: {
				youtube: youtube && youtube,
				facebook: facebook && facebook,
				twitter: twitter && twitter,
				instagram: instagram && instagram,
				linkedin: linkedin && linkedin
			}
		});
		try {
			return await profile.save();
		} catch (error) {
			throw new InternalServerErrorException();
		}
	}
}
