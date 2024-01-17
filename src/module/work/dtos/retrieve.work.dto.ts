import { IsEnum, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Type } from 'class-transformer'
import { WorkStatus } from "@prisma/client";
import { RetrieveWorkListRequest } from "../types";

export class RetrieveWorkListDto implements RetrieveWorkListRequest {

    @IsEnum(WorkStatus)
    @IsOptional()
    status?: WorkStatus;

    @MaxLength(255)
    @IsString()
    @IsOptional()
    title?: string;

    @IsNumber({
     allowNaN: false,
     allowInfinity: false,
     maxDecimalPlaces: 0,
    })
    @Type(() => Number)
    @IsOptional()
    pageSize?: number;

    
    @IsNumber({
     allowNaN: false,
     allowInfinity: false,
     maxDecimalPlaces: 0,
    })
    @Type(() => Number)
    @IsOptional()
    pageNumber?: number;
}