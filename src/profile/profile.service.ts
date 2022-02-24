import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile, ProfileDocument } from './schemas/profile.schema';
import { Model } from 'mongoose';
import { CreateProfileDto } from './dto/create-profile.dto';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class ProfileService {
	constructor(@InjectModel(Profile.name) private readonly profileModel: Model<ProfileDocument>) {}

	//Create / Update Profile
	async create(createProfileDto: CreateProfileDto, user: any): Promise<Profile> {
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

		let profileFields = {
			user: user._id,
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
		};

		let profile = await this.profileModel.findOne({ user: user._id });
		if (profile) {
			profile = await this.profileModel.findOneAndUpdate(
				{ user: user._id },
				{ $set: profileFields },
				{ new: true }
			);
		} else {
			profile = await this.profileModel.create(profileFields);
		}

		try {
			return await profile.save();
		} catch (error) {
			throw new InternalServerErrorException();
		}
	}

	//Get profile by current connected user
	async getMyProfile(user: any): Promise<Profile> {
		const profile = await this.profileModel.findOne({ user: user._id }).populate('user', [ 'name', 'avatar' ]);

		if (!profile) {
			throw new NotFoundException('Profile not found');
		}
		return profile;
	}

	//Get all Profiles
	async getAllProfiles(): Promise<Profile[]> {
		return await this.profileModel.find().populate('user', [ 'name', 'avatar' ]);
	}

	//Get profile by user id
	async getProfileById(userId: string): Promise<Profile> {
		const user = await this.profileModel.findOne({ user: userId }).populate('user', [ 'name', 'avatar' ]);
		if (!user) {
			throw new NotFoundException('Profile not found');
		}
		return user;
	}
}
