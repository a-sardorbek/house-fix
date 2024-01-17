import { WorkCreateRequest, WorkIdRequest, WorkResponce, WorkUpdateRequest } from "@module";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";

export class WorkCreate implements WorkCreateRequest {

    @ApiProperty({
      format: 'uuid',
      example: '123e4567-e89b-12d3-a456-426655440000',
    })
    userId: string;
    @ApiProperty({
     example: 'title',
    })
    title: string;

    @ApiProperty({
     example: 'description',
    })
    description: string;

    @ApiProperty({
     example: 'address',
    })
    address: string;
    
    @ApiProperty({
    example: '',
    enum: $Enums.WorkStatus,
    })
    status?: $Enums.WorkStatus;

}

export class WorkUpdate implements WorkUpdateRequest {
    @ApiProperty({
      format: 'uuid',
      example: '123e4567-e89b-12d3-a456-426655440000',
    })
    id: string;

    @ApiPropertyOptional({
        example: 'title'
    })
    title?: string;

    @ApiPropertyOptional({
        example: 'description'
    })
    description?: string;

    @ApiPropertyOptional({
        example: 'address'
    })
    address?: string;

    @ApiPropertyOptional({
        example: '',
        enum: $Enums.WorkStatus
    })
    status?: $Enums.WorkStatus;

}

export class WorkById implements WorkIdRequest {
    @ApiProperty({
      format: 'uuid',
      example: '123e4567-e89b-12d3-a456-426655440000',
    })
    id: string;
}

export class RetrieveWork implements WorkResponce {
    @ApiProperty({
      format: 'uuid',
      example: '123e4567-e89b-12d3-a456-426655440000',
    })
    id: string;

    @ApiProperty({
        example: 'title'
    })
    title: string;

    @ApiProperty({
        example: 'description'
    })
    description: string;

    @ApiProperty({
        example: 'address'
    })
    address: string;

    @ApiProperty({
        example: '',
        enum: $Enums.WorkStatus
    })
    status: string;

}

export class NotFoundResponce {
  @ApiProperty({
     example: '404',
     type: Number
  })
  statusCode: number

   @ApiProperty({
     example: 'not found'
  })
  message: string
}