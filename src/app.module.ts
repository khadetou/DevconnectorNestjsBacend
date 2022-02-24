import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { configValidationSchema } from './config.schema';
import { ProfileModule } from './profile/profile.module';
import { PostModule } from './post/post.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: [ `.env.stage.${process.env.STAGE}`, '.env' ],
			validationSchema: configValidationSchema
		}),
		MongooseModule.forRootAsync({
			imports: [ ConfigModule ],
			inject: [ ConfigService ],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get('MONGO_URI')
			})
		}),
		AuthModule,
		ProfileModule,
		PostModule
	]
})
export class AppModule {}
