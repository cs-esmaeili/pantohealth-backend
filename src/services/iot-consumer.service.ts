import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class IotConsumerService implements OnModuleInit, OnModuleDestroy {

  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private readonly queue = 'xray_queue';

  private messages: any[] = [];

  async onModuleInit() {
    this.connection = await amqp.connect(process.env.RABBIT_URL || 'amqp://localhost');
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queue, { durable: true });

    console.log('✅ Consumer connected, waiting for messages...');

    this.channel.consume(this.queue, (msg) => {
      if (msg !== null) {
        const content = msg.content.toString();
        try {
          const json = JSON.parse(content);
          this.messages.push(json);
          console.log('📥 Received:', json);
        } catch (err) {
          console.error('❌ Error parsing message:', err.message);
        }
        this.channel.ack(msg); 
      }
    });
  }

  getMessages() {
    return this.messages;
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
