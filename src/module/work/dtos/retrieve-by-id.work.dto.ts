import { IsNotEmpty, IsUUID } from "class-validator";
import { WorkIdRequest } from "../types";

export class RetrieveByIdWorkDto implements WorkIdRequest {
    @IsUUID(4)
    @IsNotEmpty()
    id: string
}
