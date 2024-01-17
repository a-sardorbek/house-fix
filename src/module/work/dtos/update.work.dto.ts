import { WorkStatus } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { WorkUpdateRequest } from "../types";

export class UpdateWorkDto implements WorkUpdateRequest {
    @IsUUID(4)
    @IsNotEmpty()
    id: string;

    @MaxLength(255)
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @MaxLength(255)
    @IsString()
    @IsOptional()
    address?: string;

    @IsEnum(WorkStatus)
    @IsOptional()
    status?: WorkStatus;

}