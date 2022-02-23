import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
	constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

	async findUser(email: string): Promise<User> {
		return await this.userModel.findOne({ email }).exec();
	}
}
