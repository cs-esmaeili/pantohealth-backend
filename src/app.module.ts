import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IotConsumerModule } from './modules/iot-consumer.module';
import { SignalsModule } from './modules/signals.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:admin@localhost:27017/iot_db?authSource=admin'),
    IotConsumerModule,
    SignalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
