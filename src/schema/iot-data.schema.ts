import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IotDataDocument = IotData & Document;

@Schema({ timestamps: true })
export class IotData {
    @Prop({ required: true })
    deviceId: string;

    @Prop({ required: true })
    time: number; // timestamp اصلی

    @Prop({ required: true })
    dataLength: number; // تعداد آیتم‌ها در data

    @Prop({ required: true })
    dataVolume: number; // مجموع تعداد مقادیر یا حجم تقریبی

    @Prop({ type: Array, default: [] })
    data: any[]; // آرایه اصلی data [time, [x, y, speed]]

    @Prop({ type: Object })
    extra?: any; // برای هر پارامتر اضافی x-ray که بخوای ذخیره کنی
}

export const IotDataSchema = SchemaFactory.createForClass(IotData);
