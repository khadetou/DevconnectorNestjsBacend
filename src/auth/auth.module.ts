import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule,
		PassportModule.register({
			defaultStrategy: 'jwt'
		}),
		JwtModule.registerAsync({
			imports: [ ConfigModule ],
			inject: [ ConfigService ],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
				signOptions: {
					expiresIn: 3600
				}
			})
		}),
		MongooseModule.forFeature([ { name: User.name, schema: UserSchema } ])
	],
	providers: [ AuthService, JwtStrategy ],
	controllers: [ AuthController ],
	exports: [ JwtStrategy, PassportModule ]
})
export class AuthModule {}
