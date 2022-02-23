import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { url } from 'gravatar';
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

		const salt = await bcrypt.genSalt();
		const hashPassword = await bcrypt.hash(password, salt);

		const user = new this.userModel({
			name,
			email,
			password: hashPassword,
			avatar: url(email, { s: '200', r: 'pg', d: 'mm' })
		});
		try {
			return await user.save();
		} catch (error) {
			if (error.code === 11000) {
				throw new ConflictException('User already exists');
			} else {
				throw new InternalServerErrorException();
			}
		}
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
