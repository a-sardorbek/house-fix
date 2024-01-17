import { UserStatus, UserType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { UserUpdateRequest } from "../types/user.type";

export class UpdateUserDto implements UserUpdateRequest {
    @IsUUID(4)
    @IsNotEmpty()
    id: string;

    @MaxLength(255)
    @IsString()
    @IsOptional()
    fullName?: string;

    @IsString()
    @IsOptional()
    userName?: string;

    @MaxLength(255)
    @IsString()
    @IsOptional()
    phone?: string;

    @IsEnum(UserStatus)
    @IsOptional()
    status?: UserStatus;

    @IsEnum(UserType)
    @IsOptional()
    type?: UserType;
}