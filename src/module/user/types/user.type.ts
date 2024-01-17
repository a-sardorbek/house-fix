import { UserStatus, UserType } from "@prisma/client";

export declare interface UserCreateRequest {
    fullName: string;
    userName: string;
    phone: string;
    status?: UserStatus;
    type?: UserType;
}

export declare interface UserUpdateRequest {
    id: string
    fullName?: string;
    userName?: string;
    phone?: string;
    status?: UserStatus;
    type?: UserType;
}

export declare interface UserIdRequest {
    id: string
}

export declare interface RetrieveUserListRequest {
    userName?: string;
    status?: UserStatus;
    type?: UserType
    pageSize?: number
    pageNumber?: number
}

export declare interface UserResponce {
    id: string;
    fullName: string;
    userName: string;
    phone: string;
    status: string;
    type: string;
}