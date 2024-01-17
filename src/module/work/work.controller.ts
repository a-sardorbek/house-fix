import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import {
  ApiBody,
  ApiTags,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger'
import { WorkResponce } from "./types";
import { CreateWorkDto, UpdateWorkDto } from "./dtos";
import { WorkService } from "./work.service";
import { NotFoundResponce, RetrieveWork, WorkCreate, WorkUpdate } from "swagger";

@ApiTags('Cleaning, Fixing Service')
@Controller({
  path: 'api/v1/work',
  version: '1',
})
export class WorkController {

    #_workService: WorkService

    constructor(workService: WorkService){
      this.#_workService = workService;
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('/new-work')
    @ApiBody({ type: WorkCreate})
    @ApiOkResponse({ type: RetrieveWork, description: 'Successfuly updated' })
    async createHouse(@Body() payload: CreateWorkDto): Promise<WorkResponce>{
        return await this.#_workService.createWork(payload)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Put('/update')
    @ApiBody({ type: WorkUpdate})
    @ApiNoContentResponse({ description: 'Successfuly updated' })
    @Put('/update')
    async updateHouse(@Body() payload: UpdateWorkDto): Promise<void>{
        await this.#_workService.updateWork(payload)
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    @ApiOkResponse({ type: RetrieveWork, description: 'User by id' })
    @ApiNotFoundResponse({ type: NotFoundResponce, description: 'Not found' })
    async retrieveHouse(@Param('id') id: string): Promise<WorkResponce> {
        return await this.#_workService.retrieveById({
          id: id
        })
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    @ApiNoContentResponse({ description: 'Successfuly deleted' })
    @ApiNotFoundResponse({ type: NotFoundResponce, description: 'Not found' })
    async deleteHouse(@Param('id') id: string): Promise<void>{
        await this.#_workService.deleteWork({
          id: id
        })
    }






    

}