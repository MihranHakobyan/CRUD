import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    name: string;

    @Prop()
    owner: string;

    @Prop({default: new Date()})
    createdAt: Date;

    @Prop({default: new Date()})
    updatedAt: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);