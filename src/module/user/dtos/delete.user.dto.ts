import { IsNotEmpty, IsUUID } from "class-validator";
import { UserIdRequest } from "../types/user.type";

export class DeleteUserDto implements UserIdRequest {
    @IsUUID(4)
    @IsNotEmpty()
    id: string
}