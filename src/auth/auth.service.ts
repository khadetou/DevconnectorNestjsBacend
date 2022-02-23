import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import gravatar from 'gravatar';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
		private jwtService: JwtService
	) {}

	async findUser(email: string): Promise<User> {
		return await this.userModel.findOne({ email }).exec();
	}

	async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
		const { name, email, password } = authCredentialsDto;
		let user = await this.userModel.findOne({ email });
		if (user) {
			throw new ConflictException('User already exists');
		}

		const { url } = gravatar;
		const salt = await bcrypt.genSalt();
		const hashPassword = await bcrypt.hash(password, salt);

		user = new this.userModel({
			name,
			email,
			password: hashPassword,
			avatar: url && url(email, { s: '200', r: 'pg', d: 'mm' })
		});
		return await user.save();
	}

	async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
		const { email, password } = authCredentialsDto;
		const user = await this.userModel.findOne({ email });

		if (user && (await bcrypt.compare(password, user.password))) {
			const payload: JwtPayload = { email: user.email };
			const accessToken = await this.jwtService.sign(payload);
			return { accessToken };
		} else {
			throw new UnauthorizedException('Invalid credentials');
		}
	}
}
