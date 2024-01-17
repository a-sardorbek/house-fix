import { IsNotEmpty, IsUUID } from "class-validator";
import { UserIdRequest } from "../types/user.type";

export class RetrieveByIdUserDto implements UserIdRequest {
    @IsUUID(4)
    @IsNotEmpty()
    id: string
}
