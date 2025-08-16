import { Controller, Get } from '@nestjs/common';
import { IotConsumerService } from './../services/iot-consumer.service';

@Controller('consumer')
export class IotConsumerController {
    constructor(private readonly consumerService: IotConsumerService) { }

    @Get('messages')
    getMessages() {
        return this.consumerService.getMessages();
    }
}
