import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { SignalsService } from '../services/signals.service';
import { IotData } from '../schema/iot-data.schema';
import { BadRequestException, NotFoundException } from '@nestjs/common';

class MockModel {
  constructor(private data: any) {
    Object.assign(this, data);
  }

  save = jest.fn().mockResolvedValue(this);

  static find = jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue([]) });
  static findById = jest.fn();
  static findByIdAndUpdate = jest.fn();
  static findByIdAndDelete = jest.fn();
}

describe('SignalsService', () => {
  let service: SignalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignalsService,
        {
          provide: getModelToken(IotData.name),
          useValue: MockModel,
        },
      ],
    }).compile();

    service = module.get<SignalsService>(SignalsService);
  });

  describe('create', () => {
    it('should create and return a signal', async () => {
      const payload = { deviceId: '123', time: 12345, dataLength: 2, dataVolume: 10 };
      const result = await service.create(payload);
      expect(result).toMatchObject(payload);
    });

    it('should throw BadRequestException if save fails', async () => {
      const payload = { deviceId: '123' };
      const erroringModel = new MockModel(payload);
      erroringModel.save = jest.fn().mockRejectedValue(new Error('save error'));
      jest.spyOn<any, any>(service, 'signalsModel').mockReturnValue(erroringModel);

      await expect(service.create(payload)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return an array of signals', async () => {
      const mockData = [{ deviceId: 'abc' }];
      MockModel.find = jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(mockData) });

      const result = await service.findAll();
      expect(result).toEqual(mockData);
    });
  });

  describe('findOne', () => {
    it('should return a signal if found', async () => {
      const mockSignal = { deviceId: '123' };
      MockModel.findById = jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(mockSignal) });

      const result = await service.findOne('507f1f77bcf86cd799439011');
      expect(result).toEqual(mockSignal);
    });

    it('should throw NotFoundException if not found', async () => {
      MockModel.findById = jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });

      await expect(service.findOne('507f1f77bcf86cd799439011')).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if invalid id', async () => {
      await expect(service.findOne('invalid-id')).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('should update and return a signal', async () => {
      const mockUpdated = { deviceId: '123', time: 555 };
      MockModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUpdated),
      });

      const result = await service.update('507f1f77bcf86cd799439011', { time: 555 });
      expect(result).toEqual(mockUpdated);
    });

    it('should throw NotFoundException if not found', async () => {
      MockModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.update('507f1f77bcf86cd799439011', {})).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if invalid id', async () => {
      await expect(service.update('invalid-id', {})).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should delete and return a signal', async () => {
      const mockDeleted = { deviceId: 'del123' };
      MockModel.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockDeleted),
      });

      const result = await service.remove('507f1f77bcf86cd799439011');
      expect(result).toEqual(mockDeleted);
    });

    it('should throw NotFoundException if not found', async () => {
      MockModel.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.remove('507f1f77bcf86cd799439011')).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if invalid id', async () => {
      await expect(service.remove('invalid-id')).rejects.toThrow(BadRequestException);
    });
  });
});
