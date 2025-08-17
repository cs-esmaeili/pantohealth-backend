import { IsOptional, IsString, IsNumber } from 'class-validator';

export class FilterSignalsDto {
    @IsOptional()
    @IsString()
    deviceId?: string;

    @IsOptional()
    @IsNumber()
    fromTime?: number;

    @IsOptional()
    @IsNumber()
    toTime?: number;
}
