import { WorkStatus } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { WorkCreateRequest } from "../types";

export class CreateWorkDto implements WorkCreateRequest {
    @IsUUID(4)
    @IsNotEmpty()
    userId: string;

    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    address: string;

    @IsEnum(WorkStatus)
    @IsOptional()
    status?: WorkStatus;

}