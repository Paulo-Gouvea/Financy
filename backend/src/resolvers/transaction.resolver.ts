import { Arg, FieldResolver, Int, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { TransactionModel } from "../models/transaction.model";
import { IsAuth } from "../middlewares/auth.middleware";
import { TransactionService } from "../services/transaction.service";
import { UserService } from "../services/user.service";
import { UserModel } from "../models/user.model";
import { CreateTransactionInput, FilterTransactionInput, UpdateTransactionInput } from "../dtos/input/transaction.input";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { User } from "@prisma/client";
import { CategoryModel } from "../models/category.model";
import { CategoryService } from "../services/category.service";
import { FilterTransactionOutput } from "../dtos/output/transaction.output";

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
    private transactionService = new TransactionService()
    private categoryService = new CategoryService()
    private userService = new UserService()

    @Mutation(() => TransactionModel)
    async createTransaction(
        @Arg('data', () => CreateTransactionInput) data: CreateTransactionInput,
        @GqlUser() user: User
    ): Promise<TransactionModel>{
        return this.transactionService.createTransaction(data, user.id)
    }

    @Mutation(() => Boolean)
    async deleteTransaction(
        @Arg('id', () => String) id: string
    ):Promise<boolean>{
        await this.transactionService.deleteTransaction(id)
        return true
    }

    @Mutation(() => TransactionModel)
    async updateTransaction(
        @Arg('data', () => UpdateTransactionInput) data: UpdateTransactionInput,
        @Arg('id', () => String) id: string
    ): Promise<TransactionModel>{
        return this.transactionService.updateTransaction(id, data)
    }

    @Query(() => [TransactionModel])
    async listAllTransaction(){
        return this.transactionService.listAllTransactions()
    }

    @Query(() => [TransactionModel])
    async listTransactionsFromOwner(
        @GqlUser() user: User
    ){
        return this.transactionService.listTransactionsFromOwner(user.id)
    }

    @Query(() => Int)
    async countTransactionsFromOwner(
        @GqlUser() user: User
    ){
        return this.transactionService.countTransactionsFromOwner(user.id)
    }

    @Query(() => Int)
    async getTotalValue(
        @GqlUser() user: User
    ){
        return this.transactionService.getTotalValue(user.id)
    }

    @Query(() => Int)
    async getTotalIncomeFromCurrentMonth(
        @GqlUser() user: User
    ){
        return this.transactionService.getTotalFromCurrentMonth(user.id, 'INCOME')
    }

    @Query(() => Int)
    async getTotalIncomeOutcomeFromCurrentMonth(
        @GqlUser() user: User
    ){
        return this.transactionService.getTotalFromCurrentMonth(user.id, 'OUTCOME')
    }

    @Query(() => FilterTransactionOutput)
    async filterTransactions(
        @GqlUser() user: User,
        @Arg('data', () => FilterTransactionInput, { nullable: true }) data?: FilterTransactionInput,
    ){
        return this.transactionService.filterTransactions(user.id, data)
    }
    
    @FieldResolver(() => CategoryModel)
    async category(@Root() transaction: TransactionModel): Promise<CategoryModel> {
        return this.categoryService.findCategoryById(transaction.categoryId)
    }

    @FieldResolver(() => UserModel)
    async owner(@Root() transaction: TransactionModel): Promise<UserModel> {
        return this.userService.findUser(transaction.ownerId)
    }
}
