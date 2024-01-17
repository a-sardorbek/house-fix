import { IsNotEmpty, IsUUID } from "class-validator";
import { WorkIdRequest } from "../types";

export class DeleteWorkDto implements WorkIdRequest {
    @IsUUID(4)
    @IsNotEmpty()
    id: string
}