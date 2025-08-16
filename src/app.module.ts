import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IotProducerModule } from './modules/iot-consumer.module';

@Module({
  imports: [IotProducerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
