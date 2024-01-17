import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto } from "./dtos";
import { UserResponce } from "./types";
import { ApiBody, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { NotFoundResponce, RetrieveUser, UserCreate, UserUpdate } from "swagger";

@ApiTags('User Service')
@Controller({
  path: 'api/v1/user',
  version: '1',
})
@Controller()
export class UserController {

    #_userService: UserService

    constructor(userService: UserService){
      this.#_userService = userService;
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('/new-user')
    @ApiBody({ type: UserCreate})
    @ApiOkResponse({ type: RetrieveUser, description: 'Successfuly updated' })
    async createUser(@Body() payload: CreateUserDto): Promise<UserResponce>{
        console.log(payload)
        return await this.#_userService.createUser(payload)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Put('/update')
    @ApiBody({ type: UserUpdate})
    @ApiNoContentResponse({ description: 'Successfuly updated' })
    async updateUser(@Body() payload: UpdateUserDto): Promise<void>{
        await this.#_userService.updateUser(payload)
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    @ApiOkResponse({ type: RetrieveUser, description: 'User by id' })
    @ApiNotFoundResponse({ type: NotFoundResponce, description: 'Not found' })
    async retrieveUser(@Param('id') id: string): Promise<UserResponce> {
        return await this.#_userService.retrieveById({
          id: id
        })
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    @ApiNoContentResponse({ description: 'Successfuly deleted' })
    @ApiNotFoundResponse({ type: NotFoundResponce, description: 'Not found' })
    async deleteUser(@Param('id') id: string): Promise<void>{
        await this.#_userService.deleteUser({
          id: id
        })
    }
}