import {BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {CreateUserDto} from "./dto/create.user.dto";
import mongoose, {Model} from "mongoose";
import {User, UserDocument} from "./schemas/user.schema";
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserDocument>,
    ) {
    }

    async create(payload: CreateUserDto) {
        const user = await this.userModel.findOne({name: payload.name, owner: payload.owner})
        if (user) {
            throw new HttpException('account already exists', HttpStatus.FORBIDDEN)
        }
        try {
            const new_user = new this.userModel(payload);
            new_user.save();
            return {
                user: new_user,
                status: HttpStatus.CREATED
            }
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    async findAllAccounts() {
        try {
            return await this.userModel.find().exec();
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    async findAccountById(id: string) {
        const valid = mongoose.Types.ObjectId.isValid(id);
        if (!valid) {
            throw new HttpException(`Invalid id : ${id}`, 400)
        }
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new NotFoundException('Account is not found');
        }
        return user;
    }

    async updateAccaunt(paylod, id) {
        const valid = mongoose.Types.ObjectId.isValid(id);
        if (!valid) {
            throw new HttpException(`Invalid id : ${id}`, 400)
        }
        paylod.updatedAt = new Date()
        const accaunt = await this.userModel.findByIdAndUpdate(id, paylod);
        if (!accaunt) {
            throw new NotFoundException('Accaunt is not found')
        }
        return {
            accaunt,
            status: 200,
            message: 'Accaunt successfully updated.',
        };
    }

    async deleteAccaunt(id) {
        const valid = mongoose.Types.ObjectId.isValid(id);
        if (!valid) {
            throw new HttpException(`Invalid id : ${id}`, 400)
        }
        const accaunt = await this.userModel.findByIdAndDelete(id);
        if (!accaunt) {
            throw new NotFoundException('Accaunt is not found')
        }
        return {
            accaunt,
            status: 200,
            message: 'Accaunt successfully deleted.',
        };
    }


}
