import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ versionKey: false, timestamps: true })
export class User extends Document {
    @Prop({required: true, type: String})
    firstName: string;

    @Prop({required: true, type: String})
    lastName: string;

    @Prop({required: true, type: String})
    password: string;

    @Prop({required: true, unique: true, type: String})
    emailAddress: string

    @Prop({type: Boolean})
    isActive: boolean

    @Prop({type: Boolean})
    isDeleted: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);