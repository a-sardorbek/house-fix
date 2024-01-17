import { Module } from "@nestjs/common";
import { PrismaService } from "config";
import { WorkController } from "./work.controller";
import { WorkService } from "./work.service";

@Module({
  controllers: [WorkController],
  providers: [WorkService, PrismaService],
})
export class WorkModule {

}