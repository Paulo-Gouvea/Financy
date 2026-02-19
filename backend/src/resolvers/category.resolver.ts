import { UseMiddleware, Resolver, Mutation, Arg, FieldResolver, Root, Query, Int } from "type-graphql";
import { CategoryModel } from "../models/category.model";
import { IsAuth } from "../middlewares/auth.middleware";
import { CategoryService } from "../services/category.service";
import { CreateCategoryInput, UpdateCategoryInput } from "../dtos/input/category.input";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { User } from "@prisma/client";
import { UserService } from "../services/user.service";
import { UserModel } from "../models/user.model";

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
    private categoryService = new CategoryService()
    private userService = new UserService()

    @Mutation(() => CategoryModel)
    async createCategory(
        @Arg('data', () => CreateCategoryInput) data: CreateCategoryInput,
        @GqlUser() user: User
    ): Promise<CategoryModel>{
        return this.categoryService.createCategory(data, user.id)
    }

    @Mutation(() => CategoryModel)
    async updateCategory(
        @Arg('data', () => UpdateCategoryInput) data: UpdateCategoryInput,
        @Arg('id', () => String) id: string
    ): Promise<CategoryModel>{
        return this.categoryService.updateCategory(id, data)
    }

    @Mutation(() => Boolean)
    async deleteCategory(
        @Arg('id', () => String) id: string
    ):Promise<boolean>{
        await this.categoryService.deleteCategory(id)
        return true
    }

    @Query(() => [CategoryModel])
    async listAllCategories(){
        return this.categoryService.listAllCategories()
    }

    @Query(() => [CategoryModel])
    async listCategoriesFromOwner(
        @GqlUser() user: User
    ){
        return this.categoryService.listCategoriesFromOwner(user.id)
    }

    @Query(() => CategoryModel)
    async getCategoryWithTheMostTransactions(
        @GqlUser() user: User
    ){
        return this.categoryService.getCategoryWithTheMostTransactions(user.id)
    }

    @Query(() => Int)
    async countCategoriesFromOwner(
        @GqlUser() user: User
    ){
        return this.categoryService.countCategoriesFromOwner(user.id)
    }

    @FieldResolver(() => UserModel)
    async owner(@Root() category: CategoryModel): Promise<UserModel> {
        return this.userService.findUser(category.ownerId)
    }
}