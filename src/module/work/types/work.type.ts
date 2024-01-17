import { WorkStatus } from "@prisma/client";

export declare interface WorkCreateRequest {
    userId: string;
    title: string;
    description: string;
    address: string;
    status?: WorkStatus;
}

export declare interface WorkUpdateRequest {
    id: string
    title?: string;
    description?: string;
    address?: string;
    status?: WorkStatus;
}

export declare interface WorkIdRequest {
    id: string
}

export declare interface RetrieveWorkListRequest {
    title?: string;
    status?: WorkStatus;
    pageSize?: number
    pageNumber?: number
}

export declare interface WorkResponce {
    id: string;
    title: string;
    address: string;
    description: string;
    status: string;
}