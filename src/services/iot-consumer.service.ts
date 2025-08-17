import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { IotData } from '../schema/iot-data.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as amqp from 'amqplib';

@Injectable()
export class IotConsumerService implements OnModuleInit, OnModuleDestroy {

  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private readonly queue = 'xray_queue';


  constructor(@InjectModel(IotData.name) private iotModel: Model<IotData>,) { }


  async traceAndSave(payload: []) {
    const deviceId = Object.keys(payload)[0];
    const deviceData = payload[deviceId];

    const doc = {
      deviceId,
      time: deviceData.time,
      dataLength: deviceData.data.length,
      dataVolume: deviceData.data.reduce((sum, item) => sum + item[1].length, 0),
      data: deviceData.data,
      extra: {}
    };

    return this.iotModel.create(doc);
  }

  async onModuleInit() {
    this.connection = await amqp.connect(process.env.RABBIT_URL || 'amqp://localhost');
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queue, { durable: true });


    this.channel.consume(this.queue, (msg) => {
      if (msg !== null) {
        const content = msg.content.toString();
        try {
          const json = JSON.parse(content);
          this.traceAndSave(json)
          console.log('Received:', json);
        } catch (err) {
          console.error('Error parsing message:', err.message);
        }
        this.channel.ack(msg);
      }
    });
  }


  async onModuleDestroy() {
    try {
      await this.channel.close();
      await this.connection.close();
    } catch (e) {
      console.log(e);
    }
  }
}
