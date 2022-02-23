import * as mongoose from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/user.schema';

export type ProfileDocument = Profile & Document;
export type ExperienceDocument = Experience & Document;
export type EducationDocument = Education & Document;

@Schema()
export class Experience {
	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	company: string;

	@Prop({ required: true })
	location: string;

	@Prop({ required: true, type: Date })
	from: Date;

	@Prop({ type: Date })
	to: Date;

	@Prop({ default: false })
	current: boolean;
	@Prop() description: string;
}

@Schema()
export class Education {
	@Prop({ required: true })
	school: string;

	@Prop({ required: true })
	degree: string;

	@Prop({ required: true })
	fieldofstudy: string;

	@Prop({ required: true, type: Date })
	from: Date;

	@Prop({ type: Date })
	to: Date;

	@Prop({ default: false })
	current: boolean;

	@Prop() description: string;
}

@Schema()
export class Profile {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	user: User;

	@Prop() company: string;

	@Prop() website: string;

	@Prop() location: string;

	@Prop({ required: true })
	status: string;

	@Prop({ required: true, type: [ String ] })
	skills: [string];

	@Prop() bio: string;

	@Prop() githubusername: string;

	@Prop() experience: [Experience];

	@Prop() education: [Education];

	@Prop(
		raw({
			youtube: String,
			twitter: String,
			facebook: String,
			linkedin: String,
			instagram: String
		})
	)
	social: Record<string, any>;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
