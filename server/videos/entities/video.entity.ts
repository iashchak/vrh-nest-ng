import { prop } from "@typegoose/typegoose";
import { IsString } from "class-validator";

export class Video {  
    @IsString()
    @prop({ required: true })
    name!: string;
}
