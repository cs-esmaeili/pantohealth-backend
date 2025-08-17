import { IsString, IsNotEmpty, IsNumber, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class DataPoint {
    @IsNumber()
    time: number;

    @IsArray()
    @IsNumber({}, { each: true }) 
    values: number[];
}

export class CreateSignalDto {
    @IsString()
    @IsNotEmpty()
    deviceId: string;

    @IsNumber()
    time: number;

    @IsNumber()
    dataLength: number;

    @IsNumber()
    dataVolume: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DataPoint)
    data: DataPoint[];

    @IsOptional()
    extra?: any;
}
