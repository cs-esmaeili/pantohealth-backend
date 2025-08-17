import { Module } from '@nestjs/common';
import { SignalsService } from '../services/signals.service';
import { SignalsController } from '../controllers/signals.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { IotData, IotDataSchema } from '../schema/iot-data.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: IotData.name, schema: IotDataSchema }]),
    ],
    controllers: [SignalsController],
    providers: [SignalsService],
})
export class SignalsModule { }
