import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "@config";
import { WorkCreateRequest, WorkIdRequest, WorkResponce, WorkUpdateRequest } from "./types";

@Injectable()
export class WorkService {

 readonly #_prisma: PrismaService

 constructor(prisma: PrismaService) {
    this.#_prisma = prisma
 }

 async createWork(data: WorkCreateRequest): Promise<WorkResponce> {
   const house = await this.#_prisma.work.create({
      data:{
         title: data.title,
         description: data.description,
         address: data.address,
         status: data.status,
         userId: data.userId
      },
      select: {
         id: true,
         title: true,
         address: true,
         description: true,
         status: true,
      }
    })

    return {
      id: house.id,
      title: house.title,
      address: house.address,
      description: house.description,
      status: house.status,
   }
 }

 async updateWork(data: WorkUpdateRequest): Promise<void> {
   await this.#_workExist(data.id)
   await this.#_prisma.work.update({
      where: {
         id: data.id,
         deletedAt: null,
      },
      data: {
         title: data.title,
         description: data.description,
         address: data.address,
         status: data.status,
      }
   })
 }

 async retrieveById(data: WorkIdRequest): Promise<WorkResponce> {
   const house = await this.#_prisma.work.findFirst({
      where: {
         id: data.id,
         deletedAt: null,
      },
      select: {
         id: true,
         title: true,
         address: true,
         description: true,
         status: true,
      }
   })

   if(!house) {
      return null
   }
   return {
      id: house.id,
      title: house.title,
      address: house.address,
      description: house.description,
      status: house.status,
   }
 }

 async deleteWork(data: WorkIdRequest): Promise<void> {
     await this.#_workExist(data.id)
     await this.#_prisma.work.update({
      where: {
         id: data.id,
         deletedAt: null,
      },
      data: { deletedAt: new Date() },
   })

 }

async #_workExist(id: string): Promise<void> {
   const houseExist = await this.#_prisma.work.findFirst({
   where: {
      id: id,
      deletedAt: null
   },
   select:{
      id: true
   }
   })

   if(!houseExist){
     throw new HttpException('House not found', HttpStatus.NOT_FOUND);
   }
  }

}