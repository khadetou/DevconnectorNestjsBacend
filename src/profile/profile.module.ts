import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './schemas/profile.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [ MongooseModule.forFeature([ { name: Profile.name, schema: ProfileSchema } ]), AuthModule ],
	providers: [ ProfileService ],
	controllers: [ ProfileController ]
})
export class ProfileModule {}
