import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from '@nestjs/common';
import {CreateUserDto} from './dto/create.user.dto';
import {UserService} from './user.service';
import {UpdateUserDto} from "./dto/update.user.dto";

@Controller('account')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }

    @Get()
    async findAllAccounts() {
        return this.userService.findAllAccounts()
    }

    @Get(':id')
    async findAccountById(@Param('id') id: string) {
        try {
            return this.userService.findAccountById(id)
        } catch (err) {
            throw new NotFoundException(err);
        }
    }

    @Put(':id')
    async update(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
        try {
            return this.userService.updateAccaunt(updateUserDto, id)
        } catch (err) {
            throw new NotFoundException(err);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        try {
            return this.userService.deleteAccaunt(id)
        } catch (err) {
            throw new NotFoundException(err);
        }
    }
}

