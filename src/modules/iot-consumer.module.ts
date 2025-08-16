import { Module } from '@nestjs/common';
import { IotConsumerController } from './../controllers/iot-consumer.controller';
import { IotConsumerService } from '../services/iot-consumer.service';

@Module({
    controllers: [IotConsumerController],
    providers: [IotConsumerService],
})
export class IotProducerModule { }
