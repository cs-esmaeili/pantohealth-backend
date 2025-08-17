import { IsString, IsNotEmpty, IsNumber, IsArray, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSignalDto {
    @ApiProperty({ example: '66bb584d4ae73e488c30a072' })
    @IsString()
    @IsNotEmpty()
    deviceId: string;

    @ApiProperty({ example: 1735683480000, description: 'Unix ms timestamp' })
    @IsNumber()
    time: number;

    @ApiProperty({ example: 3 })
    @IsNumber()
    dataLength: number;

    @ApiProperty({ example: 9, description: 'Sum of values lengths or computed volume' })
    @IsNumber()
    dataVolume: number;

    @ApiProperty({
        example: [
            [762, [51.339764, 12.339223833333334, 1.2038]],
            [1766, [51.33977733333333, 12.339211833333334, 1.531604]],
            [2763, [51.339782, 12.339196166666667, 2.13906]],
        ],
        description: 'Array of [time, [x, y, speed]]',
        type: Array,
    })
    @IsArray()
    data: any[];

    @ApiPropertyOptional({ description: 'Any extra x-ray params' })
    @IsOptional()
    extra?: any;
}
