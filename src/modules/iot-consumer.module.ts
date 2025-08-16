import { Module } from '@nestjs/common';
import { IotConsumerController } from './../controllers/iot-consumer.controller';
import { IotConsumerService } from '../services/iot-consumer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { IotData, IotDataSchema } from '../schema/iot-data.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: IotData.name, schema: IotDataSchema }]),
    ],
    controllers: [IotConsumerController],
    providers: [IotConsumerService],
})
export class IotConsumerModule { }
