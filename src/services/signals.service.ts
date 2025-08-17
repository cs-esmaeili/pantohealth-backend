import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IotData } from '../schema/iot-data.schema';



@Injectable()
export class SignalsService {
    constructor(@InjectModel(IotData.name) private signalsModel: Model<IotData>) { }

    create(payload: any) {
        return this.signalsModel.create(payload);
    }

    findAll() {
        return this.signalsModel.find().exec();
    }

    findOne(id: string) {
        return this.signalsModel.findById(id).exec();
    }

    update(id: string, payload: any) {
        return this.signalsModel.findByIdAndUpdate(id, payload, { new: true }).exec();
    }

    remove(id: string) {
        return this.signalsModel.findByIdAndDelete(id).exec();
    }
}
