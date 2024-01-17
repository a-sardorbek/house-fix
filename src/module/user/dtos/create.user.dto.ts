import { UserStatus, UserType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { UserCreateRequest } from "../types/user.type";

export class CreateUserDto implements UserCreateRequest {
    
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsString()
    @IsNotEmpty()
    userName: string;

    @MaxLength(15)
    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsEnum(UserStatus)
    @IsOptional()
    status?: UserStatus;

    @IsEnum(UserType)
    @IsOptional()
    type?: UserType;
}