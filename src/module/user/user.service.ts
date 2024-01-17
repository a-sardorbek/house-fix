import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserCreateRequest, UserIdRequest, UserResponce, UserUpdateRequest } from "./types";
import { PrismaService } from "@config";

@Injectable()
export class UserService {

   readonly #_prisma: PrismaService


 constructor(prisma: PrismaService) {
    this.#_prisma = prisma
 }

 async createUser(data: UserCreateRequest): Promise<UserResponce> {
    console.log(data)
   const user = await this.#_prisma.user.create({
      data:{
         userName: data.userName,
         fullName: data.fullName,
         phone: data.phone,
         status: data.status,
         type: data.type,
      },
      select: {
       id: true,
       userName: true,
       fullName: true,
       phone: true,
       status: true,
       type: true,
      }
    })

    return {
      id: user.id,
      userName: user.userName,
      phone: user.phone,
      fullName: user.fullName,
      status: user.status,
      type: user.type
   }

 }

 async updateUser(data: UserUpdateRequest): Promise<void> {
   await this.#_userExist(data.id)
   await this.#_prisma.user.update({
      where: {
         id: data.id,
         deletedAt: null,
      },
      data: {
         userName: data.userName,
         fullName: data.fullName,
         phone: data.phone,
         status: data.status,
         type: data.type,
      }
   })
 }

 async retrieveById(data: UserIdRequest): Promise<UserResponce> {
   const user = await this.#_prisma.user.findFirst({
      where: {
         id: data.id,
         deletedAt: null,
      },
      select: {
         id: true,
         userName: true,
         fullName: true,
         phone: true,
         status: true,
         type: true,
      }
   })

   if(!user) {
      return null
   }
   return {
      id: user.id,
      userName: user.userName,
      phone: user.phone,
      fullName: user.fullName,
      status: user.status,
      type: user.type
   }
 }

 async deleteUser(data: UserIdRequest): Promise<void> {
     await this.#_userExist(data.id)
     await this.#_prisma.user.update({
      where: {
         id: data.id,
         deletedAt: null,
      },
      data: { deletedAt: new Date() },
   })

 }

async #_userExist(id: string): Promise<void> {
   const userExist = await this.#_prisma.user.findFirst({
   where: {
      id: id,
      deletedAt: null
   },
   select:{
      id: true
   }
   })

   if(!userExist){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
   }
  }

}