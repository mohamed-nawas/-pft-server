import mongoose, { Document, Model, Schema } from "mongoose";

/**
 * User model
 */
export interface User extends Document {
    username: string;
    email: string;
    pwd: string;
}

const userSchema = new Schema<User>({
    username: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    pwd: { type: String, required: true, minlength: 10 }
}, { timestamps: true })

export const UserModel: Model<User> = mongoose.model<User>('User', userSchema)