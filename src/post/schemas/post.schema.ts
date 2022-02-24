import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

export type PostDocument = Post & Document;

@Schema()
export class Post {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	user: User;
	@Prop({ type: String, required: true })
	text: string;
	@Prop({ type: String })
	name: string;
	@Prop({ type: String })
	avatar: string;

	@Prop({
		type: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User'
				}
			}
		]
	})
	likes: {
		user: User;
	}[];

	@Prop({
		type: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User'
				},
				text: { type: String, required: true },
				name: { type: String },
				avatar: { type: String },
				createdAt: { type: Date, default: Date.now }
			}
		]
	})
	comments: {
		user: User;
		text: string;
		name: string;
		avatar: string;
		createdAt: Date;
	};
	@Prop({ default: Date.now })
	createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
