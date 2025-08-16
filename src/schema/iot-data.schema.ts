import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class IotData extends Document {
    @Prop({ type: Object })
    payload: any;
}

export const IotDataSchema = SchemaFactory.createForClass(IotData);
