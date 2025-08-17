import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IotDataDocument = IotData & Document;

@Schema({ timestamps: true })
export class IotData {
    @Prop({ required: true })
    deviceId: string;

    @Prop({ required: true })
    time: number;

    @Prop({ required: true })
    dataLength: number; 

    @Prop({ required: true })
    dataVolume: number; 

    @Prop({ type: Array, default: [] })
    data: any[];

    @Prop({ type: Object })
    extra?: any;
}

export const IotDataSchema = SchemaFactory.createForClass(IotData);
