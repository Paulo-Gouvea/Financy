import { Arg, Query, Resolver, Mutation, UseMiddleware } from "type-graphql"
import { UserModel } from "../models/user.model"
import { UserService } from "../services/user.service"
import { IsAuth } from "../middlewares/auth.middleware"
import { CreateUserInput, UpdateUserNameInput } from "../dtos/input/user.input"


@Resolver(() => UserModel)
@UseMiddleware(IsAuth)
export class UserResolver {
    private userService = new UserService()

    @Mutation (() => UserModel)
    async createUser(
        @Arg('data', () => CreateUserInput) data: CreateUserInput
    ): Promise<UserModel>{
        return this.userService.createUser(data)
    }

    @Mutation(() => UserModel)
    async updateUserName(
        @Arg('data', () => UpdateUserNameInput) data: UpdateUserNameInput,
        @Arg('id', () => String) id: string
    ): Promise<UserModel>{
        return this.userService.updateUserName(id, data)
    }

    @Query(() => UserModel)
    async getUser(
        @Arg('id', () => String) id: string
    ): Promise<UserModel>{
        return this.userService.findUser(id)
    }

    @Query(() => [UserModel])
    async getAllUsers(): Promise<UserModel[]>{
        return this.userService.findAllUsers()
    }
}