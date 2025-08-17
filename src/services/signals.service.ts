import {
    Injectable,
    NotFoundException,
    BadRequestException,
    InternalServerErrorException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { IotData, IotDataDocument } from '../schema/iot-data.schema';

@Injectable()
export class SignalsService {
    constructor(
        @InjectModel(IotData.name) private signalsModel: Model<IotDataDocument>,
    ) { }

    async create(payload: any): Promise<IotData> {
        try {
            const created = new this.signalsModel(payload);
            return await created.save();
        } catch (error) {
            throw new BadRequestException(`Invalid data: ${error.message}`);
        }
    }

    async findAll(): Promise<IotData[]> {
        try {
            return await this.signalsModel.find().exec();
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch signals');
        }
    }

    async findOne(id: string): Promise<IotData> {
        if (!isValidObjectId(id)) {
            throw new BadRequestException(`Invalid ID format: ${id}`);
        }
        const signal = await this.signalsModel.findById(id).exec();
        if (!signal) {
            throw new NotFoundException(`Signal with ID ${id} not found`);
        }
        return signal;
    }

    async update(id: string, payload: any): Promise<IotData> {
        if (!isValidObjectId(id)) {
            throw new BadRequestException(`Invalid ID format: ${id}`);
        }
        const updated = await this.signalsModel
            .findByIdAndUpdate(id, payload, { new: true })
            .exec();
        if (!updated) {
            throw new NotFoundException(`Signal with ID ${id} not found`);
        }
        return updated;
    }

    async remove(id: string): Promise<IotData> {
        if (!isValidObjectId(id)) {
            throw new BadRequestException(`Invalid ID format: ${id}`);
        }
        const deleted = await this.signalsModel.findByIdAndDelete(id).exec();
        if (!deleted) {
            throw new NotFoundException(`Signal with ID ${id} not found`);
        }
        return deleted;
    }
}
