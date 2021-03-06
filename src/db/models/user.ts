import { Document, Schema, model, models } from 'mongoose';

export interface IUser {
	emailHash?: string;
	passwordHash: string;
	username: string;
}

export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema({
	emailHash: {
		type: String,
		unique: true
	},
	passwordHash: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true,
		trim: true,
		unique: true
	}
});

export default models.User || model<IUserDocument>('User', userSchema, 'users');
