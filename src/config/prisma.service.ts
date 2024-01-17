import { Injectable, OnModuleInit } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'info' | 'warn' | 'error' | 'query'>
  implements OnModuleInit
{

  async onModuleInit(): Promise<void> {
      await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect();
  } 
 
}