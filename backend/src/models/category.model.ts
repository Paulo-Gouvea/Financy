import { Field, GraphQLISODateTime, ID, Int, ObjectType } from "type-graphql";
import { UserModel } from "./user.model";
import { TransactionModel } from "./transaction.model";

@ObjectType()
export class CategoryModel  {
    @Field(() => ID)
    id!: string

    @Field(() => String)
    title!: string

    @Field(() => String, { nullable: true })
    description?: string

    @Field(() => String)
    icon!: string

    @Field(() => String)
    color!: string

    @Field(() => Int, { nullable: true })
    totalOfTransactions?: number

    @Field(() => Int, { nullable: true })
    balance?: number

    @Field(() => GraphQLISODateTime)
    createdAt!: Date

    @Field(() => GraphQLISODateTime)
    updatedAt!: Date

    @Field(() => [TransactionModel], { nullable: true })
    transactions?: TransactionModel[]

    @Field(() => String)
    ownerId!: string

    @Field(() => UserModel, { nullable: true })
    owner?: UserModel
}