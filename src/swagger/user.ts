import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";
import { UserCreateRequest, UserIdRequest, UserResponce, UserUpdateRequest } from "module/user/types";

export class UserCreate implements UserCreateRequest {

    @ApiProperty({
     example: 'title',
    })
    fullName: string;

    @ApiProperty({
     example: 'description',
    })
    userName: string;

    @ApiProperty({
     example: 'address',
    })
    phone: string;
    
    @ApiProperty({
    example: '',
    enum: $Enums.UserStatus,
    })
    status?: $Enums.UserStatus;

    @ApiProperty({
    example: '',
    enum: $Enums.UserType,
    })
    type?: $Enums.UserType;
    
}

export class UserUpdate implements UserUpdateRequest {
    @ApiProperty({
      format: 'uuid',
      example: '123e4567-e89b-12d3-a456-426655440000',
    })
    id: string;

    @ApiPropertyOptional({
        example: 'fullname'
    })
    fullName?: string;

    @ApiPropertyOptional({
        example: 'userName'
    })
    userName?: string;

    @ApiPropertyOptional({
        example: 'phone'
    })
    phone?: string;

    @ApiPropertyOptional({
        example: '',
        enum: $Enums.UserStatus
    })
    status?: $Enums.UserStatus;

    @ApiPropertyOptional({
        example: '',
        enum: $Enums.UserType
    })
    type?: $Enums.UserType;
    
}

export class UserById implements UserIdRequest {
    @ApiProperty({
      format: 'uuid',
      example: '123e4567-e89b-12d3-a456-426655440000',
    })
    id: string;
}

export class RetrieveUser implements UserResponce {
    @ApiProperty({
      format: 'uuid',
      example: '123e4567-e89b-12d3-a456-426655440000',
    })
    id: string;

    @ApiProperty({
        example: 'userName'
    })
    userName: string;

    @ApiProperty({
        example: 'fullName'
    })
    fullName: string;

    @ApiProperty({
        example: 'phone'
    })
    phone: string;

    @ApiProperty({
        example: '',
    })
    status: string;

    @ApiProperty({
        example: '',
    })
    type: string;

}