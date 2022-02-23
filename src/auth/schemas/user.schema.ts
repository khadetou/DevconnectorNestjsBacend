import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
	@Prop({ required: true })
	name: string;

	@Prop({ unique: true, required: true })
	email: string;

	@Prop({ required: true })
	password: string;

	@Prop() avatar: string;

	@Prop({ default: Date.now })
	createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
