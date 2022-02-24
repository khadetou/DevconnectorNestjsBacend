import * as mongoose from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { boolean } from 'joi';

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

	@Prop({ default: false, type: Boolean })
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

	@Prop({
		type: [
			{
				title: { type: String, required: true },
				company: { type: String, required: true },
				location: { type: String, required: true },
				from: { type: Date, required: true },
				to: { type: Date },
				current: { type: Boolean, default: false },
				description: { type: String, required: true }
			}
		]
	})
	experience: {
		title: string;
		company: string;
		location: string;
		to: Date;
		current: boolean;
		description: string;
		_id?: any;
	}[];

	@Prop({
		type: [
			{
				school: { type: String, required: true },
				degree: { type: String, required: true },
				fieldofstudy: { type: String, required: true },
				from: { type: Date, required: true },
				to: { type: Date },
				current: { type: Boolean, default: false },
				description: { type: String, required: true }
			}
		]
	})
	education: {
		school: string;
		degree: string;
		fieldofstudy: string;
		to: Date;
		current: boolean;
		description: string;
		_id?: any;
	}[];

	@Prop(
		raw({
			youtube: { type: String },
			twitter: { type: String },
			facebook: { type: String },
			linkedin: { type: String },
			instagram: { type: String }
		})
	)
	social: Record<string, any>;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
